import { getFilters } from "@/db/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import SliderComponent from "./Slider";
import SelectionComponent from "./Selection";
export default async function Filters() {
  const { data, success, error } = await getFilters();

  if (!success) return <div>{error}</div>;

  if (!data) return <div>No filters</div>;

  return (
    <div className="p-4 md:border md:rounded-lg">
      <Accordion type="multiple">
        {data.map((item) => {
          return (
            <AccordionItem key={item.label} value={item.label}>
              <AccordionTrigger className="text-lg font-semibold">
                {item.label}
              </AccordionTrigger>
              <AccordionContent>
                {Array.isArray(item.value) ? (
                  <SelectionComponent label={item.label} options={item.value} />
                ) : (
                  <SliderComponent
                    label={item.label}
                    min={item.value.min}
                    max={item.value.max}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
