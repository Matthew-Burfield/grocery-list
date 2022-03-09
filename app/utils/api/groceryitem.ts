import { Prisma } from "@prisma/client";
import { db } from "~/utils/db.server";

export async function getAllGroceryItems() {
  return db.groceryItem.findMany();
}

export async function resetGroceryItems() {
  await db.groceryItem.deleteMany();
}

export async function createGroceryItem(
  groceryItem: Prisma.GroceryItemCreateInput
) {
  return db.groceryItem.create({ data: groceryItem });
}

export async function checkGroceryItemOffList(id: number) {
  return db.groceryItem.update({
    data: { isChecked: true },
    where: { id },
  });
}

export async function unCheckGroceryItem(id: number) {
  return db.groceryItem.update({
    data: { isChecked: false },
    where: { id },
  });
}

export async function deleteGroceryItem(id: number) {
  return db.groceryItem.delete({
    where: { id },
  });
}
