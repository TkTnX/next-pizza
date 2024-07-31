import bcrypt from "bcrypt";
import { categories, ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { Prisma } from "@prisma/client";

const hash = (password: string, salt = 10) => bcrypt.hashSync(password, salt);

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor((Math.random() * (max - min) * 10 + min * 10) / 10).toString();
};

const generateProductItem = ({
  productID,
  pizzaType,
  size,
}: {
  productID: number;
  pizzaType?: number;
  size?: number;
}) => {
  return {
    productID,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as unknown as Prisma.VariantsUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "bob",
        email: "bob@ts.com",
        password: hash("123", 10),
        verificated: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Timur",
        email: "timur20-09@mail.ru",
        password: hash("Timur228", 10),
        verificated: new Date(),

        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });
  await prisma.ingredient.createMany({
    data: ingredients,
  });
  await prisma.product.createMany({
    data: products,
  });
  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
      categoryId: 1,
      ingredient: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
      categoryId: 1,
      ingredient: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
      categoryId: 1,
      ingredient: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  const variants = await prisma.variants.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({ productID: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productID: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productID: pizza1.id, pizzaType: 2, size: 40 }),

      // Пицца "Сырная"
      generateProductItem({ productID: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productID: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productID: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productID: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productID: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productID: pizza2.id, pizzaType: 2, size: 40 }),

      // Пицца "Чоризо фреш"
      generateProductItem({ productID: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productID: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productID: pizza3.id, pizzaType: 2, size: 40 }),

      // Остальные продукты
      generateProductItem({ productID: 1 }),
      generateProductItem({ productID: 2 }),
      generateProductItem({ productID: 3 }),
      generateProductItem({ productID: 4 }),
      generateProductItem({ productID: 5 }),
      generateProductItem({ productID: 6 }),
      generateProductItem({ productID: 7 }),
      generateProductItem({ productID: 8 }),
      generateProductItem({ productID: 9 }),
      generateProductItem({ productID: 10 }),
      generateProductItem({ productID: 11 }),
      generateProductItem({ productID: 12 }),
      generateProductItem({ productID: 13 }),
      generateProductItem({ productID: 14 }),
      generateProductItem({ productID: 15 }),
      generateProductItem({ productID: 16 }),
    ],
  });
}
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Variants" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.log(error);
  }
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
