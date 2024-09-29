import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get, update, or delete a task by ID
export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });
    res.status(200).json(task);
  } else if (req.method === 'PUT') {
    const { text, status } = req.body;
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { text, status },
    });
    res.status(200).json(updatedTask);
  } else if (req.method === 'DELETE') {
    await prisma.task.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  }
}
