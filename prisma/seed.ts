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
      type: "fruit",
    },
    {
      name: "Chicken",
      type: "fruit",
    },
    {
      name: "Apples",
      type: "fruit",
    },
    {
      name: "Peanut butter",
      type: "fruit",
    },
    {
      name: "Pasta",
      type: "fruit",
    },
  ];
}
