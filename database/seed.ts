import { PrismaClient } from '@prisma/client';
import { Hash } from '../src/utils/bcryptType';

const prisma = new PrismaClient();

async function main() {

  const post1 = await prisma.users.create({
    data: {
     email: 'xiexini@gmail.com',
     password: Hash.make('222222'),
     gender: 'F',
    },
  });

  const post2 = await prisma.users.create({
    data: {
     email: 'mark@gmail.com',
     password: Hash.make('111111'),
     gender: 'M',
    },
  });
 
  //console.log({ post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

