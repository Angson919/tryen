import express from 'express';
import { Event } from '../models/Event.js';
import { TicketType } from '../models/TicketType.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const events = await Event.findAll(page);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get event by slug
router.get('/:slug', async (req, res) => {
  try {
    const event = await Event.findBySlug(req.params.slug);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Get ticket types for this event
    const ticketTypes = await TicketType.findByEvent(event.id);
    
    res.json({
      ...event,
      ticket_types: ticketTypes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create event
router.post('/', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;