import { Prisma } from "@prisma/client";
import { db } from "~/utils/db.server";

export async function getAllQuickLists() {
  return db.quickList.findMany();
}

export async function getQuickListById(id: number) {
  return db.quickList.findUnique({ where: { id } });
}

export async function createEveryWeekItem(data: Prisma.QuickListCreateInput) {
  return db.quickList.create({ data });
}

export async function deleteEveryWeekItem(id: number) {
  return db.quickList.delete({
    where: { id },
  });
}
