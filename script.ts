import { PrismaClient } from '@prisma/client'
import express from 'express'

const app = express()
app.use(express.json())

const prisma = new PrismaClient()

app.get('/posts', async (request, response) => {
  const posts = await prisma.post.findMany()
  
  return response.json(posts)
})

app.get('/posts/:id', async (request, response) => {
  const { id } = request.params
  
  const post = await prisma.post.findFirst({
    where: {
      id: Number(id)
    }
  })
  
  return response.json(post)
})

app.get('/users', async (request, response) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true
    }
  })
  
  return response.json(users)
})

app.get('/users/:id', async (request, response) => {
  const { id } = request.params
  
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      posts: true
    }
  })
  
  return response.json(user)
})

app.listen(3333, () => console.log("server is running"))