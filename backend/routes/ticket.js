import express from 'express';
import { Ticket } from '../models/ticket.js';
import { sendTicketEmail } from '../services/email.js';

const router = express.Router();

// Purchase ticket (simplified - actual payment happens elsewhere)
router.post('/purchase', async (req, res) => {
  try {
    const { event_id, ticket_type_id, email, attendee_name, quantity = 1 } = req.body;
    
    // In reality, this would happen after payment confirmation
    // For now, we'll create tickets immediately
    
    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = await Ticket.create({
        event_id,
        ticket_type_id,
        email,
        attendee_name
      });
      tickets.push(ticket);
      
      // Send ticket email
      await sendTicketEmail(email, ticket);
    }
    
    res.status(201).json({
      message: 'Tickets created successfully',
      tickets,
      success: true
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Check ticket validity
router.get('/check/:code', async (req, res) => {
  try {
    const ticket = await Ticket.findByCode(req.params.code);
    
    if (!ticket) {
      return res.json({ valid: false, message: 'Ticket not found' });
    }
    
    if (ticket.status === 'checked_in') {
      return res.json({ 
        valid: false, 
        message: 'Ticket already used',
        checked_in_at: ticket.checked_in_at 
      });
    }
    
    res.json({
      valid: true,
      ticket,
      message: 'Valid ticket'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check-in ticket
router.post('/check-in/:code', async (req, res) => {
  try {
    const ticket = await Ticket.findByCode(req.params.code);
    
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    if (ticket.status === 'checked_in') {
      return res.status(400).json({ error: 'Ticket already checked in' });
    }
    
    const checkedInTicket = await Ticket.checkIn(ticket.id);
    
    res.json({
      success: true,
      message: 'Ticket checked in successfully',
      ticket: checkedInTicket
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Claim tickets by email
router.post('/claim', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const tickets = await Ticket.findByEmail(email);
    
    // Resend all tickets
    for (const ticket of tickets) {
      await sendTicketEmail(email, ticket);
    }
    
    res.json({
      success: true,
      message: `Tickets sent to ${email}`,
      count: tickets.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;