import { Form, useLoaderData, useTransition } from "remix";
import React from "react";
import EveryWeekItem from "~/components/EveryWeekItem";
import type { ActionFunction, LoaderFunction } from "remix";
import { QuickList, QuickListItem } from "@prisma/client";
import { getQuickListById } from "~/utils/api/quickList";
import { getAllQuickListItems } from "~/utils/api/quickListItem";

type NewQuickList = { name: string };
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
  const quickListId = Number(url.searchParams.get("id"));
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
