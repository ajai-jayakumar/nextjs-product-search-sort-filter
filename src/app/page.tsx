import Products from "@/components/List/Products";
import { getProducts } from "../db/actions";

export default async function Home() {
  const { data, success, error } = await getProducts();

  if (!success) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto m-4 p-4">
      <div className="flex gap-4">
        <div className="w-1/4">filer section</div>
        <div className="w-3/4">
          <Products data={data} />
        </div>
      </div>
    </div>
  );
}
