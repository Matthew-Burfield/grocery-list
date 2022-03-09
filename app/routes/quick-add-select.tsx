import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

type tQuickList = {
  id: string;
  name: string;
};
type LoaderData = { quickLists: Array<tQuickList> };
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    quickLists: await Promise.resolve([
      { id: "1", name: "Meat Loaf" },
      { id: "2", name: "Stir Fry" },
    ]),
  };
  return data;
};

export default function SelectQuickAddList() {
  const { quickLists } = useLoaderData<LoaderData>();

  return (
    <>
      <ul>
        {quickLists.map((quickList) => (
          <li key={quickList.id}>{quickList.name}</li>
        ))}
      </ul>
    </>
  );
}
