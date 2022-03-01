import { Prisma } from "@prisma/client";
import { db } from "~/utils/db.server";

export async function getAllEveryWeekItems() {
  return db.everyWeekItem.findMany();
}

export async function createEveryWeekItem(
  data: Prisma.EveryWeekItemCreateInput
) {
  return db.everyWeekItem.create({ data });
}

export async function deleteEveryWeekItem(id: string) {
  return db.everyWeekItem.delete({
    where: { id },
  });
}
