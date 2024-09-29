import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const documents = await prisma.document.findMany(); // Fetch all documents
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch documents' });
    }
  } else if (req.method === 'POST') {
    // For creating a new document
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    try {
      const newDocument = await prisma.document.create({
        data: { title, content },
      });
      res.status(201).json(newDocument);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create document' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
