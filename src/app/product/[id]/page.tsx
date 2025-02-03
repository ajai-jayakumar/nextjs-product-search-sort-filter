import NavigateBack from "@/components/NavigateBack";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getProductById } from "@/db/actions";
import {
  Calendar,
  Gauge,
  DollarSign,
  BadgeCheck,
  Cog,
  MapPin,
  Car,
  AlertTriangle,
  FileText,
  Battery,
  Zap,
  Users,
  Palette,
  Route,
} from "lucide-react";
import Image from "next/image";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const { data, success, error } = await getProductById(id);

  if (!success)
    return (
      <div className="flex flex-col text-lg items-center justify-center h-screen text-center p-4">
        <AlertTriangle className="h-6 w-6 text-red-500" aria-hidden="true" />{" "}
        {error}
      </div>
    );

  if (!data) return <div>No information found</div>;

  return (
    <>
      <main className="w-full max-w-7xl mx-auto py-12 flex flex-col gap-8">
        <nav>
          <NavigateBack value="listing" />
        </nav>

        <header className="flex flex-row gap-2 items-center">
          <h1 className="text-2xl font-bold">{data.brand}</h1>
          <h2 className="text-xl font-bold">({data.model})</h2>
        </header>

        <section aria-label="Product Images">
          <Carousel>
            <CarouselContent>
              {Array.isArray(data.images) &&
                data.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent className="flex items-center justify-center">
                        <Image
                          src={image}
                          alt={`${data.brand} ${data.model} - Image ${
                            index + 1
                          }`}
                          width={750}
                          height={400}
                          className="rounded-sm w-full h-full object-contain"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious
              className="absolute left-3"
              aria-label="Previous image"
            />
            <CarouselNext
              className="absolute right-3"
              aria-label="Next image"
            />
          </Carousel>
        </section>

        <section
          className="mt-4 text-lg rounded-md"
          aria-label="Product Details"
        >
          <dl>
            <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-200">
              <dt className="font-bold flex items-center gap-2">
                <Calendar className="h-4 w-4" aria-hidden="true" /> Year
              </dt>
              <dd>{data.year}</dd>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-100">
              <dt className="font-bold flex items-center gap-2">
                <Palette className="h-4 w-4" aria-hidden="true" /> Color
              </dt>
              <dd>{data.color}</dd>
            </div>
            {data.condition === "Used" && (
              <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-200">
                <dt className="font-bold flex items-center gap-2">
                  <Gauge className="h-4 w-4" aria-hidden="true" /> Kilometer
                  Count
                </dt>
                <dd>{data.kilometer_count.toLocaleString()} km</dd>
              </div>
            )}
            <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-100">
              <dt className="font-bold flex items-center gap-2">
                <DollarSign className="h-4 w-4" aria-hidden="true" /> Price
              </dt>
              <dd>{`€ ${data.price.toLocaleString()}`}</dd>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-200">
              <dt className="font-bold flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" /> Condition
              </dt>
              <dd>{data.condition}</dd>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-100">
              <dt className="font-bold flex items-center gap-2">
                <Cog className="h-4 w-4" aria-hidden="true" /> Drivetrain
              </dt>
              <dd>{data.drivetrain}</dd>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-200">
              <dt className="font-bold flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Location
              </dt>
              <dd>{data.location}</dd>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-100">
              <dt className="font-bold flex items-center gap-2">
                <Car className="h-4 w-4" aria-hidden="true" /> Autopilot
              </dt>
              <dd>{data.autopilot ? "Yes" : "No"}</dd>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-200">
              <dt className="font-bold flex items-center gap-2">
                <Battery className="h-4 w-4" aria-hidden="true" /> Battery
                Capacity
              </dt>
              <dd>{data.battery_capacity_kWh} kWh</dd>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-100">
              <dt className="font-bold flex items-center gap-2">
                <Zap className="h-4 w-4" aria-hidden="true" /> Charging Speed
              </dt>
              <dd>{data.charging_speed_kW} kW</dd>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-200">
              <dt className="font-bold flex items-center gap-2">
                <Users className="h-4 w-4" aria-hidden="true" /> Seats
              </dt>
              <dd>{data.seats}</dd>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-100">
              <dt className="font-bold flex items-center gap-2">
                <Route className="h-4 w-4" aria-hidden="true" /> Range
              </dt>
              <dd>{data.range_km} km</dd>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-200">
              <dt className="font-bold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />{" "}
                Accidents
              </dt>
              <dd>{data.accidents ? "Yes" : "No"}</dd>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 bg-gray-100">
              <dt className="font-bold flex items-center gap-2">
                <FileText className="h-4 w-4" aria-hidden="true" /> Accident
                Description
              </dt>
              <dd>{data.accident_description}</dd>
            </div>
          </dl>
        </section>
      </main>
    </>
  );
}
