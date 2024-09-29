// pages/api/events/[id].js
import prisma from '@/lib/Prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const event = await prisma.event.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'Event deleted successfully', event });
    } catch (error) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Event not found' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
