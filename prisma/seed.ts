import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getGroceryItems().map((item) => {
      return db.groceryItem.create({ data: item });
    })
  );
}

seed();

function getGroceryItems() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      name: "Bananas",
    },
    {
      name: "Chicken",
    },
    {
      name: "Apples",
    },
    {
      name: "Peanut butter",
    },
    {
      name: "Pasta",
    },
  ];
}
