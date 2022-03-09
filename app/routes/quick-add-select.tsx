import { useLoaderData, Link } from "remix";
import type { LoaderFunction } from "remix";
import { QuickList } from "@prisma/client";
import { getAllQuickLists } from "~/utils/api/quickList";

type LoaderData = { quickLists: Array<QuickList> };
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    quickLists: await getAllQuickLists(),
  };
  return data;
};

export default function SelectQuickAddList() {
  const { quickLists } = useLoaderData<LoaderData>();

  return (
    <>
      <ul>
        {quickLists.map((quickList) => (
          <li key={quickList.id}>
            <Link to={`/quick-add?id=${quickList.id}`}>{quickList.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
