"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NavigateBack({ value }: { value: string }) {
  return (
    <Link
      href="#"
      onClick={() => window.history.back()}
      className="hover:underline flex items-center gap-1"
    >
      <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back to {value}
    </Link>
  );
}
