import { Prisma } from "@prisma/client";
import { db } from "~/utils/db.server";

export async function getAllGroceryItems() {
  return db.groceryItem.findMany();
}

export async function createGroceryItem(
  groceryItem: Prisma.GroceryItemCreateInput
) {
  return db.groceryItem.create({ data: groceryItem });
}

export async function checkGroceryItemOffList(id: string) {
  return db.groceryItem.update({
    data: { isChecked: true },
    where: { id },
  });
}

export async function unCheckGroceryItem(id: string) {
  return db.groceryItem.update({
    data: { isChecked: false },
    where: { id },
  });
}
