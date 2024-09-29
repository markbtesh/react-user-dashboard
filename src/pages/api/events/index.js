import prisma from '@/lib/Prisma';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { title, start, end, allDay } = req.body;

      // Check for missing fields
      if (!title || !start || !end) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Create a new event in the database
      const newEvent = await prisma.event.create({
        data: {
          title,
          start: new Date(start), // Start date in DateTime format
          end: new Date(end),
          allDay: allDay || false,  // Default to false if not provided
        },
      });

      res.status(200).json(newEvent);

    } else if (req.method === 'GET') {
      // Get all events
      const events = await prisma.event.findMany();
      res.status(200).json(events);

    } else if (req.method === 'DELETE') {
      // Get event ID from the request query
      const { id } = req.query;

      // Delete the event by ID
      await prisma.event.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json({ message: 'Event deleted successfully' });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
