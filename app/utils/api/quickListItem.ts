import { Prisma } from "@prisma/client";
import { db } from "~/utils/db.server";

export async function getAllQuickListItems(quickListId: number) {
  return db.quickListItem.findMany({
    where: {
      listId: quickListId,
    },
  });
}
