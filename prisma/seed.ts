import { PrismaClient } from "@prisma/client";
var bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function seedUsers() {
  const usersData = [
    {
      username: "user",
      name: "This is a user",
      password: "user123",
    },
  ];

  for (const userData of usersData) {
    const { username, name, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.upsert({
      where: { username },
      update: {},
      create: {
        username,
        name,
        password: hashedPassword,
      },
    });
  }
}

async function main() {
  try {
    await seedUsers();
    console.log("Seeder selesai");
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
