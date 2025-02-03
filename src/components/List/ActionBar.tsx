import SearchComponent from "./Search";
import SortComponent from "./Sort";
import Filters from "./Filters";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";

export default function ActionBar() {
  return (
    <div className="flex justify-between items-center mb-8 rounded-sm">
      <SearchComponent />
      <div className="flex items-center gap-2">
        <SortComponent />
        {/** Mobile Filter Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter By</SheetTitle>
              </SheetHeader>
              <Filters />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
