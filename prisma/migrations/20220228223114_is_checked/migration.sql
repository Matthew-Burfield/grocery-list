-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GroceryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_GroceryItem" ("createdAt", "id", "isChecked", "name", "type", "updatedAt") SELECT "createdAt", "id", "isChecked", "name", "type", "updatedAt" FROM "GroceryItem";
DROP TABLE "GroceryItem";
ALTER TABLE "new_GroceryItem" RENAME TO "GroceryItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;