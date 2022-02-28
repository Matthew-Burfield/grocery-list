/*
  Warnings:

  - Added the required column `type` to the `GroceryItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GroceryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_GroceryItem" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "GroceryItem";
DROP TABLE "GroceryItem";
ALTER TABLE "new_GroceryItem" RENAME TO "GroceryItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
