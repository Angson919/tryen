import { pool } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';

export const Ticket = {
  // Create ticket (after payment)
  async create(ticketData) {
    const id = uuidv4();
    const ticketCode = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Generate QR code data
    const qrData = JSON.stringify({
      ticket_id: id,
      event_id: ticketData.event_id,
      code: ticketCode
    });
    
    const qrCode = await QRCode.toDataURL(qrData);
    
    const query = `
      INSERT INTO tickets (id, event_id, ticket_type_id, email, attendee_name, qr_code, ticket_code, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    
    const values = [
      id,
      ticketData.event_id,
      ticketData.ticket_type_id,
      ticketData.email,
      ticketData.attendee_name || 'Guest',
      qrCode,
      ticketCode,
      'valid'
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get ticket by QR code
  async findByCode(code) {
    const query = 'SELECT * FROM tickets WHERE ticket_code = $1';
    const result = await pool.query(query, [code]);
    return result.rows[0];
  },

  // Check-in ticket
  async checkIn(ticketId) {
    const query = `
      UPDATE tickets 
      SET status = 'checked_in', checked_in_at = NOW() 
      WHERE id = $1 AND status = 'valid'
      RETURNING *
    `;
    const result = await pool.query(query, [ticketId]);
    return result.rows[0];
  },

  // Get tickets by email
  async findByEmail(email) {
    const query = 'SELECT * FROM tickets WHERE email = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [email]);
    return result.rows;
  }
};