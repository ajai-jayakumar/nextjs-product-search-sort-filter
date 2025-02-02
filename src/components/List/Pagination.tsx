import {
  Pagination,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

type PaginationComponentProps = {
  count: number;
  searchParams: Record<string, string>;
};

export default function PaginationComponent({
  count,
  searchParams,
}: PaginationComponentProps) {
  const totalPages = Math.ceil(count / PAGE_SIZE);
  const currentPage = parseInt(searchParams.page) || 1;

  if (totalPages <= 1) return null;

  const updateUrlParams = (page: number) => {
    if (page < 1 || page > totalPages) return "#";
    return `?${new URLSearchParams({
      ...searchParams,
      page: page.toString(),
    })}`;
  };

  const paginationItems = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={updateUrlParams(currentPage - 1)}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {paginationItems.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href={updateUrlParams(pageNum)}
              className={cn(
                currentPage === pageNum && "bg-blue-500 text-white"
              )}
              aria-current={currentPage === pageNum ? "page" : undefined}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={updateUrlParams(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
