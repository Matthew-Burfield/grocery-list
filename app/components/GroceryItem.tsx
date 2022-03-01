import { GroceryItem } from "@prisma/client";
import { Form } from "remix";

type Action = "check" | "uncheck";
interface Props {
  item: GroceryItem;
  action: Action;
}

export default function GroceryItem(props: Props) {
  return (
    <>
      <Form method="post">
        <input type="hidden" name="id" value={props.item.id} />
        <button
          type="submit"
          aria-label={props.action}
          name="_action"
          value={props.action}
        >
          x
        </button>
      </Form>{" "}
      {props.item.name}
    </>
  );
}
