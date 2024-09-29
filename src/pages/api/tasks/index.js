import prisma from '@/lib/Prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  } else if (req.method === 'POST') {
    try {
      const { text, author, status } = req.body;
      const newTask = await prisma.task.create({
        data: {
          text,
          author: author || "me",  // Default to Anonymous if no author is provided
          status: status || "todo",        // Default to "todo" if no status is provided
          comments: 0,                      // Set default comments to 0
          liked: false
        },
      });
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
