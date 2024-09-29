// api/documents/[id].js

import prisma from '@/lib/Prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const document = await prisma.document.findUnique({
        where: { id: Number(id) },
      });
      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }
      res.json(document);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch document' });
    }
  } else if (req.method === 'PUT') {
    const { content } = req.body;
    try {
      const updatedDocument = await prisma.document.update({
        where: { id: Number(id) },
        data: { content },
      });
      res.json(updatedDocument);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update document' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
