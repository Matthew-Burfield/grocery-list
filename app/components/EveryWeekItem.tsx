import { EveryWeekItem } from "@prisma/client";
import { Form } from "remix";

interface Props {
  item: EveryWeekItem;
}

export default function GroceryItem(props: Props) {
  return (
    <>
      <Form replace method="post">
        <input type="hidden" name="id" value={props.item.id} />
        {props.item.name}
        <button
          type="submit"
          aria-label={"delete"}
          name="_action"
          value={"delete"}
        >
          x
        </button>
      </Form>
    </>
  );
}
