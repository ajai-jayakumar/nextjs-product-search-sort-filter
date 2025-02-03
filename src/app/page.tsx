import ActionBar from "@/components/List/ActionBar";
import Filters from "@/components/List/Filters";
import Products from "@/components/List/Products";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const currentSearchParamsParams = await searchParams;
  return (
    <div className="w-full max-w-7xl mx-auto m-4 p-4">
      <div className="flex gap-4">
        <div className="hidden md:block md:w-1/4">
          {/** Hide the filters in mobile view */}
          <Filters />
        </div>
        <div className="w-full md:w-3/4">
          <ActionBar />
          <Products searchParams={currentSearchParamsParams} />
        </div>
      </div>
    </div>
  );
}
