import { GroceryItem } from "@prisma/client";
import { Form, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import type { ActionFunction, LoaderFunction } from "remix";

type LoaderData = { groceryItems: Array<GroceryItem> };
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    groceryItems: await db.groceryItem.findMany(),
  };
  return data;
};

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  switch (_action) {
    case "create": {
      if (typeof values.name !== "string") {
        throw Error("Form not submitted correctly");
      }
      const data = {
        name: values.name,
        type: "test",
      };
      return await db.groceryItem.create({ data });
    }

    case "check": {
      if (typeof values.id !== "string") {
        throw Error("Form not submitted correctly");
      }
      if (typeof values.isChecked !== "string") {
        throw Error("Form not submitted correctly");
      }
      return await db.groceryItem.update({
        data: { isChecked: values.isChecked === "true" },
        where: { id: values.id },
      });
    }
  }
};

export default function list() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      {data.groceryItems
        .filter((item) => !item.isChecked)
        .map((item) => (
          <li key={item.id}>
            <Form method="post">
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="isChecked" value={"true"} />
              <button
                type="submit"
                aria-label="check"
                name="_action"
                value="check"
              >
                x
              </button>
            </Form>{" "}
            {item.name}
          </li>
        ))}
      <Form method="post">
        <label>
          Item: <input name="name" />
        </label>
        <button type="submit" name="_action" value="create">
          Submit
        </button>
      </Form>
      {data.groceryItems
        .filter((item) => item.isChecked)
        .map((item) => (
          <li key={item.id}>
            <Form method="post">
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="isChecked" value={"false"} />
              <button
                type="submit"
                aria-label="check"
                name="_action"
                value="check"
              >
                x
              </button>
            </Form>{" "}
            {item.name}
          </li>
        ))}
    </>
  );
}
