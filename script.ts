import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  // ... you will write your Prisma Client queries here
  const posts = await prisma.user.findFirst({ 
    where: {
      email: {
        contains: "jmamadeu2000"
      }
    },
  }).posts()

  console.dir({posts}, { depth: Infinity })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
