import { Form, useLoaderData, useTransition } from "remix";
import React from "react";
import {
  createEveryWeekItem,
  deleteEveryWeekItem,
  getAllEveryWeekItems,
} from "~/utils/api/everyweekitem";
import EveryWeekItem from "~/components/EveryWeekItem";
import type { ActionFunction, LoaderFunction } from "remix";
import type { EveryWeekItem as tEveryWeekItem } from "@prisma/client";

type LoaderData = { items: Array<tEveryWeekItem> };
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    items: await getAllEveryWeekItems(),
  };
  return data;
};

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get("_action");

  switch (action) {
    case "create": {
      return createEveryWeekItem({
        name: formData.get("name") as string,
        type: "test",
      });
    }

    case "delete": {
      return deleteEveryWeekItem(formData.get("id") as string);
    }
  }
};

export default function CreateQuickAddList() {
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
        {data.items.map((item) => (
          <li key={item.id}>
            <EveryWeekItem item={item} />
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
    </>
  );
}
