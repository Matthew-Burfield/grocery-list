import type { GroceryItem as tGroceryItem } from "@prisma/client";
import { Form, useLoaderData, useTransition } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import {
  checkGroceryItemOffList,
  createGroceryItem,
  deleteGroceryItem,
  getAllGroceryItems,
  unCheckGroceryItem,
} from "~/utils/api/groceryitem";
import React from "react";
import GroceryItem from "~/components/GroceryItem";
import FloatingQuickAddMenu from "~/components/FloatingQuickAddMenu";

type LoaderData = { groceryItems: Array<tGroceryItem> };
export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const isStartingNewGroceryShop = Boolean(url.searchParams.get("new"));

  console.log(isStartingNewGroceryShop);

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

    case "delete": {
      return deleteGroceryItem(formData.get("id") as string);
    }
  }
};

export default function Index() {
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
      <ul>
        {data.groceryItems
          .filter((item) => !item.isChecked)
          .map((item) => (
            <li key={item.id}>
              <GroceryItem item={item} action="check" />
            </li>
          ))}
      </ul>
      <Form replace method="post" ref={formRef}>
        <label>
          Item: <input name="name" />
        </label>
        <button type="submit" name="_action" value="create">
          Submit
        </button>
      </Form>
      <ul>
        {data.groceryItems
          .filter((item) => item.isChecked)
          .map((item) => (
            <li key={item.id}>
              <GroceryItem item={item} action="uncheck" />
            </li>
          ))}
      </ul>
      <FloatingQuickAddMenu />
    </>
  );
}
