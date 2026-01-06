import { pool } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const Event = {
  // Create new event
  async create(eventData) {
    const id = uuidv4();
    const slug = eventData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const query = `
      INSERT INTO events (id, creator_id, title, slug, date, location, map_link, banner_url, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    
    const values = [
      id,
      eventData.creator_id,
      eventData.title,
      slug,
      eventData.date,
      eventData.location,
      eventData.map_link,
      eventData.banner_url,
      eventData.description || ''
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get event by slug
  async findBySlug(slug) {
    const query = 'SELECT * FROM events WHERE slug = $1';
    const result = await pool.query(query, [slug]);
    return result.rows[0];
  },

  // Get events (paginated)
  async findAll(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT * FROM events 
      WHERE date > NOW() 
      ORDER BY date ASC 
      LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  }
};