import fastify from "fastify"
import sensible from "@fastify/sensible"
import cors from "@fastify/cors"
import cookie from "@fastify/cookie"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import nodemailer from 'nodemailer'
dotenv.config()

var date_time = new Date();
console.log(date_time)

const sendMail = (to, subject, message) =>{
  const transporter = nodemailer.createTransport({
      service : "outlook",
      auth : {
          user : "PatrickSigma69Bateman@outlook.com",
          pass : "sigma696969"
      },
      tls: {
        rejectUnauthorized: false
      }
  })

  const options = {
      from : "PatrickSigma69Bateman@outlook.com", 
      to, 
      subject, 
      text: message,
  }

  transporter.sendMail(options, (error, info) =>{
      if(error) console.log(error)
      else console.log("success send ")
  })

}

//sendMail('laughygamer@gmail.com', 'Server b00ted', 'Server is b00ted at ' + date_time);


const app = fastify()
app.register(sensible)
app.register(cors, {
  origin: process.env.CLIENT_URL,
  credentials: true,
})

const prisma = new PrismaClient()

const COMMENT_SELECT_FIELDS = {
  id: true,
  message: true,
  parentId: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
}

app.get("/users", async(req, res)=>{
  return await commitToDb(prisma.user.findMany({
      select:{
        id:true,
        name:true,
      },
  }))
})

// to get all posts
app.get("/posts", async (req, res) => {
  return await commitToDb(
    prisma.post.findMany({
      select: {
        id: true,
        title: true,
        body: true,
      },
    })
  )
})

// to get a single post
app.get("/posts/:id/:userId", async (req, res) => {
  return await commitToDb(
    prisma.post
      .findUnique({
        where: { id: req.params.id },
        select: {
          body: true,
          title: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            select: {
              ...COMMENT_SELECT_FIELDS,
              _count: { select: { likes: true } },
            },
          },
        },
      })
      .then(async post => {
        const likes = await prisma.like.findMany({
          where: {
            userId: req.params.userId,
            commentId: { in: post.comments.map(comment => comment.id) },
          },
        })

        return {
          ...post,
          comments: post.comments.map(comment => {
            const { _count, ...commentFields } = comment
            return {
              ...commentFields,
              likedByMe: likes.find(like => like.commentId === comment.id),
              likeCount: _count.likes,
            }
          }),
        }
      })
  )
})

// to create comment pass userId in body and it works
app.post("/posts/:id/comments", async (req, res) => {
  if (req.body.message === "" || req.body.message == null) {
    return res.send(app.httpErrors.badRequest("Message is required"))
  }

  return await commitToDb(
    prisma.comment
      .create({
        data: {
          message: req.body.message,
          userId: req.body.userId,
          parentId: req.body.parentId,
          postId: req.params.id,
        },
        select: COMMENT_SELECT_FIELDS,
      })
      .then(comment => {
        return {
          ...comment,
          likeCount: 0,
          likedByMe: false,
        }
      })
  )
})

// to update the comments
app.put("/posts/:postId/comments/:commentId", async (req, res) => {
  if (req.body.message === "" || req.body.message == null) {
    return res.send(app.httpErrors.badRequest("Message is required"))
  }

  // const { userId } = await prisma.comment.findUnique({
  //   where: { id: req.params.commentId },
  //   select: { userId: true },
  // })
  // if (userId !== req.cookies.userId) {
  //   return res.send(
  //     app.httpErrors.unauthorized(
  //       "You do not have permission to edit this message"
  //     )
  //   )
  // }

  return await commitToDb(
    prisma.comment.update({
      where: { id: req.params.commentId },
      data: { message: req.body.message },
      select: { message: true },
    })
  )
})

// to delete comment
app.delete("/posts/:postId/comments/:commentId", async (req, res) => {
  // const { userId } = await prisma.comment.findUnique({
  //   where: { id: req.params.commentId },
  //   select: { userId: true },
  // })
  // if (userId !== req.cookies.userId) {
  //   return res.send(
  //     app.httpErrors.unauthorized(
  //       "You do not have permission to delete this message"
  //     )
  //   )
  // }

  return await commitToDb(
    prisma.comment.delete({
      where: { id: req.params.commentId },
      select: { id: true },
    })
  )
})

// to add like 
app.post("/posts/:postId/comments/:commentId/toggleLike", async (req, res) => {
  const data = {
    commentId: req.params.commentId,
    userId: req.body.userId,
  }

  const like = await prisma.like.findUnique({
    where: { userId_commentId: data },
  })

  if (like == null) {
    return await commitToDb(prisma.like.create({ data })).then(() => {
      return { addLike: true }
    })
  } else {
    return await commitToDb(
      prisma.like.delete({ where: { userId_commentId: data } })
    ).then(() => {
      return { addLike: false }
    })
  }
})



async function commitToDb(promise) {
  const [error, data] = await app.to(promise)
  if (error) return app.httpErrors.internalServerError(error.message)
  return data
}

app.listen({ port: process.env.PORT })
