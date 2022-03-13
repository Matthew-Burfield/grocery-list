import { Form, useLoaderData, useTransition } from "remix";
import React, { SyntheticEvent } from "react";
import EveryWeekItem from "~/components/EveryWeekItem";
import type { ActionFunction, LoaderFunction } from "remix";
import { QuickList, QuickListItem } from "@prisma/client";
import { getQuickListById } from "~/utils/api/quickList";
import { getAllQuickListItems } from "~/utils/api/quickListItem";

type NewQuickList = { tempId: number; name: string };
type LoaderData = {
  quickList: QuickList | NewQuickList;
  items: Array<QuickListItem>;
};
function isIdValid(id: unknown) {
  return typeof id === "number" && id > 0;
}
export let loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const url = new URL(request.url);
  const quickListId = Number(url.searchParams.get(""));
  if (isIdValid(quickListId)) {
    const quickList = await getQuickListById(quickListId);
    if (quickList !== null) {
      return {
        quickList,
        items: await getAllQuickListItems(quickListId),
      };
    }
  }
  return {
    quickList: {
      name: "",
      tempId: 0,
    },
    items: [],
  };
};

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get("_action");

  switch (action) {
    case "create": {
    }

    case "delete": {
    }
  }
};

export default function CreateQuickAddList() {
  const [items, setItems] = React.useState<Array<NewQuickList>>([]);
  const itemCount = React.useRef<number>(0);
  const formRef = React.useRef<HTMLFormElement>(null);

  function handleFormSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const nameInput: HTMLInputElement | null =
      form.querySelector('[name="name"]');
    const nameValue = nameInput?.value || "";
    setItems((items) => [
      ...items,
      { tempId: itemCount.current++, name: nameValue },
    ]);
    nameInput?.focus();
    form.reset();
  }

  return (
    <>
      <h1>New Quick List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.tempId}>
            <EveryWeekItem item={item} />
          </li>
        ))}
      </ul>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <label>
          Item: <input name="name" id="name" />
        </label>
        <button value="add" type="submit">
          Add
        </button>
      </form>
    </>
  );
}
