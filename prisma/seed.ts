import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.cliente.create({
      data: {
        limite: 100000,
        saldo: 0,
      },
    }),
    prisma.cliente.create({
      data: {
        limite: 80000,
        saldo: 0,
      },
    }),
    prisma.cliente.create({
      data: {
        limite: 1000000,
        saldo: 0,
      },
    }),
    prisma.cliente.create({
      data: {
        limite: 10000000,
        saldo: 0,
      },
    }),
    prisma.cliente.create({
      data: {
        limite: 500000,
        saldo: 0,
      },
    }),
  ]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
