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
  const {id } = request.params
  
  const post = await prisma.post.findFirst({
    where: {
      id: Number(id)
    }
  })
  
  return response.json(post)
})

app.listen(3333, () => console.log("server is running"))