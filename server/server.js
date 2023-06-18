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
        email: true,
        password: true,
        etc1: true,
        etc2: true,
        etc3: true,
        verified: true,
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
        atr1: true,
        atr2: true,
        atr3: true,
        atr4: true,
        token: true,
        _count:{
          select:{
            Upvote: true,
          }
        },
      },
    })
  )
})

app.get("/getUser/:userId", async(req,res)=>{
  return await commitToDb(prisma.user.findUnique({
    where:{
      id : req.params.userId,
    },
    select:{
      name: true,
      email: true,
      etc1: true,
      etc2: true,
      etc3: true,
    }
  }))
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
          _count: {
            select: {
              Upvote:true,
            }
          },
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
  console.log(req.body.userId+" "+req.body.message+" "+req.body.parentId+" "+req.params.id);
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

// to signup and send email verification send details in body
app.post("/signup/:email", async(req, res)=>{
  console.log("Signup request from "+req.params.email)
  const createUser = await prisma.user.create({ 
    data: { 
      name: req.body.name, 
      email: req.params.email,
      password: req.body.password,
      etc1: req.body.etc1,
      etc2: req.body.etc2,
      etc3: req.body.etc3,
      verified: false,
  } })
  const u_email = req.params.email
  const u_name = req.params.name
  const link = " http://localhost:3001/verify/" + createUser.id
  sendMail(''+u_email, 'Verify you email ' + u_name , "Click on the link to verify your email : " + link)
})

// verify email
app.get("/verify/:userId", async(req, res)=>{
  return await commitToDb( prisma.user.update({ 
    where: {
      id : req.params.userId,
    },
    data: { 
      verified: true,
    }, 
    select: {
      name: true,
    }
  }))
})

// login for user
app.post("/login/user", async(req,res)=>{
  return await prisma.user.findFirst({
    where:{
      email: req.body.email,
      password: req.body.password
    },
    select:{
      id: true,
      name: true,
      verified: true,
      email: true,
    }
  })
})

app.post("/login/post", async(req, res)=>{
  return await commitToDb(prisma.post.findFirst({
    where:{
      atr1: req.body.username,
      atr2: req.body.password,
    },
    select:{
      id: true,
    }
  }))
})

// signup or just post a post homie
app.post("/signup/post", async(req,res)=>{
  return await commitToDb(prisma.post.create({ 
    data: { 
      title: req.body.title,
      body: req.body.body,
      atr1: req.body.atr1,
      atr2: req.body.atr2,
      atr3: req.body.atr3,
      atr4: req.body.atr4,
  }}))
})

// to toogle upvote return true is upvote added else false;
app.get("/toggleupvote/:postId/:userId", async(req, res)=>{
  const data = {
    postId: req.params.postId,
    userId: req.params.userId,
  }

  const upvote = await prisma.upvote.findUnique({
    where: { userId_postId: data },
  })

  if (upvote == null) {
    return await commitToDb(prisma.upvote.create({ data })).then(() => {
      return { addUpvote: true }
    })
  } else {
    return await commitToDb(
      prisma.upvote.delete({ where: { userId_postId: data } })
    ).then(() => {
      return { addUpvote: false }
    })
  }
})

// display post a user upvoted
app.get("/upvotedposts/:userId", async(req, res)=>{
  return prisma.upvote.findMany({
      where:{
        userId: req.params.userId,
      },
      select:{
        post: {
          select:{
            id: true,
            title: true,
            body: true,
            atr1: true,
            atr2: true,
            atr3: true,
            atr4: true,
            _count: {
              select:{
                Upvote: true,
              }
            }
          }
        }
      }
  })
})

app.get("/getPostDetails/:postId",async(req,res)=>{
  return await commitToDb(prisma.post.findUnique({
    where:{
      id: req.params.postId,
    },
    select:{
      title: true,
      body: true,
      atr1: true,
      atr3: true,
      atr4: true,
      token: true,
      createdAt: true,
    }
  }))
})

// <---- MSG Endpoints are TESTED and Backend seems to work fine --->
// to send a message to user/invester at a cost of -1 token
// body should constain msg, postId, userId mainly
// primary key is userId, postId so only one msg is possible
app.post("/sendmsg/:postId/:userId", async(req, res)=>{

    const msg = await commitToDb(prisma.message.findFirst({
      where:{
        userId: req.params.userId,
        postId: req.params.postId,
      }
    }))

    if(msg !== null) {
      return null
    }
    else{
   const temp = await commitToDb(prisma.message.create({
      data: {
        message: req.body.message,
        userId: req.params.userId,
        postId: req.params.postId,
        mode: 1,
      }
   }))

   const temp2 = await commitToDb(prisma.post.update({
    where: {
      id: req.params.postId,
    },
    data: {
      token: {
        decrement: 1,
      }
    }
   }))

   return temp
  }
   
})

// to get msg given to particular user
app.get("/getMsgUser/:userId", async(req, res)=>{
  return await commitToDb(prisma.message.findMany({
    where:{
      userId: req.params.userId,
    },
    select: {
      message: true,
      user: true,
      post: true,
    }
  }))
})

// to get msg given by particular post
app.get("/getMsgPost/:postId", async(req, res)=>{
  return await commitToDb(prisma.message.findMany({
    where:{
      postId: req.params.postId,
    },
    select: {
      message: true,
      user: true,
      post: true,
    }
  }))
})

// for experimenting and checking returns all message sent
app.get("/msg", async(req, res)=>{
  return await commitToDb(prisma.message.findMany({
    select:{
      userId: true,
      postId: true,
      message: true,
    }
  }))
})

// query route for posts aka startups boi
app.get("/posts/filter", async(req, res)=>{
  const q1 = req.query.title || ''
  const q2 = req.query.body || ''
  const q3 = req.query.atr1 || ''
  const q4 = req.query.atr2 || ''
  const q5 = req.query.atr3 || ''
  const q6 = req.query.atr4 || ''
  const sort = req.query.sort || 'desc'

  return await commitToDb(prisma.post.findMany({
    where:{
      title:{
        contains: q1,
        mode: 'insensitive',
      },
      body:{
        contains: q2,
        mode: 'insensitive',
      },
      atr1: {
        contains: q3,
        mode: 'insensitive',
      },
      atr2: {
        contains: q4,
        mode: 'insensitive',
      },
      atr3:{
        contains: q5,
        mode: 'insensitive',
      },
      atr4: {
        contains: q6,
        mode: 'insensitive',
      },
    },
    orderBy:{
      createdAt: sort
    },
    select:{
      id: true,
      title: true,
      body: true,
      atr1: true,
      atr2: true,
      atr3: true,
      atr4: true,
      token: true,
    },
  }))

})
/*
  User/Post login/signup done
  Upvote system done works fine
  <----->
  Nested Comment section works fine (sometimes needs a refresh after login)
  <----->
  Message + token system (if a person mesasges someone his token gets decreased by one)
  Dynamic search (search through posts aka startups)

  -->Need to be done
  //shys part done rest improving front end left

  <------>
  Chat Idea dropped as interfacing with comment section + not needed 
  + token system violated
  <------>

*/

async function commitToDb(promise) {
  const [error, data] = await app.to(promise)
  if (error) return app.httpErrors.internalServerError(error.message)
  return data
}

app.listen({ port: process.env.PORT })
