import { GroceryItem } from "@prisma/client";
import { LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = { groceryItems: Array<GroceryItem> };
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    groceryItems: await db.groceryItem.findMany(),
  };
  return data;
};

export default function list() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      {data.groceryItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </>
  );
}
