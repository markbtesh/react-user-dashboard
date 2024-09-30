import { PrismaClient } from '@prisma/client';

let prisma;

// Initialize Prisma client only once
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Handler function for API routes
export async function handler(req, res) {
  try {
    const documents = await prisma.document.findMany();  // Example query
    res.status(200).json(documents);
  } catch (error) {
    console.error("Prisma Error:", error);  // Log the error to understand the issue
    res.status(500).json({ error: "Database connection or query error" });
  }
}

// Export the Prisma client for usage in other files if needed
export default prisma;
