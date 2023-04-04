import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function seed() {
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()
}

seed()
