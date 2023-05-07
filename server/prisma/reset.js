import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function seed() {
  await prisma.like.deleteMany()
  await prisma.upvote.deleteMany()
  await prisma.message.deleteMany()
  await prisma.intrest.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()
}

seed()
