import { GroceryItem } from "@prisma/client";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  useLoaderData,
} from "remix";
import { db } from "~/utils/db.server";

type LoaderData = { groceryItems: Array<GroceryItem> };
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    groceryItems: await db.groceryItem.findMany(),
  };
  return data;
};

export let action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  if (typeof name !== "string") {
    throw new Error("Form not submitted correctly.");
  }
  const fields = { name, type: "test" };
  const newGroceryItem = await db.groceryItem.create({ data: fields });
  return json(newGroceryItem);
};

export default function list() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      {data.groceryItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
      <Form method="post">
        <label>
          Item: <input name="name" />
        </label>
        <button type="submit">Submit</button>
      </Form>
    </>
  );
}
