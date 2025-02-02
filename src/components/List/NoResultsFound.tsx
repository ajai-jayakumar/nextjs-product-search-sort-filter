"use client";

import Link from "next/link";

export default function NoResultsFound() {
  return (
    <div className="text-center py-10">
      <div className=" text-gray-500">No Results Found</div>
      <Link
        href="/"
        className="text-blue-500"
        onClick={() => (window.location.href = "/")}
      >
        Reset Filters
      </Link>
    </div>
  );
}
