import SearchComponent from "./Search";
import SortComponent from "./Sort";

export default function ActionBar() {
  return (
    <div className="flex justify-between items-center mb-8 rounded-sm">
      <SearchComponent />
      <SortComponent />
    </div>
  );
}
