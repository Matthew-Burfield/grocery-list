import { GroceryItem } from "@prisma/client";
import { Form, useLoaderData, useTransition } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import {
  checkGroceryItemOffList,
  createGroceryItem,
  getAllGroceryItems,
  unCheckGroceryItem,
} from "~/utils/api";
import React from "react";

type LoaderData = { groceryItems: Array<GroceryItem> };
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    groceryItems: await getAllGroceryItems(),
  };
  return data;
};

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get("_action");

  switch (action) {
    case "create": {
      return createGroceryItem({
        name: formData.get("name") as string,
        type: "test",
      });
    }

    case "check": {
      return checkGroceryItemOffList(formData.get("id") as string);
    }

    case "uncheck": {
      return unCheckGroceryItem(formData.get("id") as string);
    }
  }
};

export default function list() {
  const data = useLoaderData<LoaderData>();
  const transition = useTransition();
  const formRef = React.useRef<HTMLFormElement>(null);

  const isAdding =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "create";

  React.useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
    }
  }, [isAdding]);

  return (
    <>
      {data.groceryItems
        .filter((item) => !item.isChecked)
        .map((item) => (
          <li key={item.id}>
            <Form method="post">
              <input type="hidden" name="id" value={item.id} />
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
      <Form method="post" ref={formRef}>
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
              <button
                type="submit"
                aria-label="uncheck"
                name="_action"
                value="uncheck"
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
