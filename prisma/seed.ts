import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
const allUsers: Awaited<ReturnType<typeof prisma.user.findMany>> = await prisma.user.findMany()
console.log(allUsers)


// await prisma.item.create({
//   data: {
//     name: 'orange juice',
//     slug: 'orange-juice',
//     price: 4.99,
//     category: {
//       connect: { id: '68f566ca9839687e54292122' }
//     },
//     imageUrl: '/drinks.jpg',
//     createdBy: {
//        connect: { id: '68f55730cdad9b4fb1d95884' }
//     }
//   }
// })
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
