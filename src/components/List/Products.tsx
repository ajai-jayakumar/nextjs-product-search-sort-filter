import { getProducts } from "@/db/actions";
import Image from "next/image";
import Link from "next/link";

export default async function Products({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { data, success, error } = await getProducts(searchParams);

  if (!success) return <div>{error}</div>;

  if (!data || data.length === 0)
    return (
      <div className="text-center py-10">
        <div className=" text-gray-500 py-2">No Results Found</div>
        <div>
          <Link href="/" className="text-blue-500">
            Reset Filters
          </Link>
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex gap-2 mb-8 border rounded-sm flex-col"
        >
          <div>
            <Image
              // TODO: Later on, we can use a placeholder image
              src={
                Array.isArray(item.images)
                  ? item.images[0] ?? ""
                  : item.images ?? ""
              }
              alt={item.brand}
              width={300}
              height={170}
              className="rounded-sm w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-xl font-bold">{`€${item.price.toLocaleString()}`}</p>
            <p className="text-sm text-gray-500  mb-2">
              {item.year} - {item.kilometer_count.toLocaleString()} km
            </p>
            <p className="text-sm font-bold text-gray-600">
              {item.brand} - <span className="text-sm">{item.model}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
