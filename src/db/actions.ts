"use server";

import { CarsTable } from "@/db/schema";
import { db } from "@/db";
import { and, eq, sql, lte, asc, desc, ilike, or } from "drizzle-orm";

const SORT_OPTIONS = {
  "price-low-to-high": asc(CarsTable.price),
  "price-high-to-low": desc(CarsTable.price),
  "brand-a-z": asc(CarsTable.brand),
  "brand-z-a": desc(CarsTable.brand),
} as const;

export async function getProducts(searchParams: Record<string, string>) {
  try {
    const conditions = [];
    const orderBy = [];

    if (searchParams.brand) {
      const brands = searchParams.brand.split(",");
      conditions.push(sql`${CarsTable.brand} IN ${brands}`);
    }

    if (searchParams.model) {
      const models = searchParams.model.split(",");
      conditions.push(sql`${CarsTable.model} IN ${models}`);
    }

    if (searchParams.year) {
      conditions.push(eq(CarsTable.year, parseInt(searchParams.year)));
    }

    if (searchParams.condition) {
      conditions.push(
        eq(CarsTable.condition, searchParams.condition as "New" | "Used")
      );
    }

    if (searchParams.location) {
      conditions.push(eq(CarsTable.location, searchParams.location));
    }

    if (searchParams.price) {
      conditions.push(lte(CarsTable.price, parseInt(searchParams.price)));
    }

    if (searchParams.sortBy) {
      orderBy.push(
        SORT_OPTIONS[searchParams.sortBy as keyof typeof SORT_OPTIONS]
      );
    }

    if (searchParams.search) {
      conditions.push(
        or(
          ilike(CarsTable.model, `%${searchParams.search}%`),
          ilike(CarsTable.brand, `%${searchParams.search}%`)
        )
      );
    }

    const query =
      conditions.length > 0
        ? db
            .select()
            .from(CarsTable)
            .where(and(...conditions))
            .orderBy(...orderBy)
        : db
            .select()
            .from(CarsTable)
            .orderBy(...orderBy);

    const data = await query;
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error: "Could not fetch products" };
  }
}

export async function getFilters() {
  try {
    const uniqueValues = await Promise.all([
      db
        .selectDistinct({ value: CarsTable.brand })
        .from(CarsTable)
        .orderBy(CarsTable.brand),
      db
        .selectDistinct({ value: CarsTable.model })
        .from(CarsTable)
        .orderBy(CarsTable.model),
      db
        .selectDistinct({ value: CarsTable.year })
        .from(CarsTable)
        .orderBy(CarsTable.year),
      db
        .selectDistinct({ value: CarsTable.condition })
        .from(CarsTable)
        .orderBy(CarsTable.condition),
      db
        .selectDistinct({ value: CarsTable.location })
        .from(CarsTable)
        .orderBy(CarsTable.location),
    ]);
    const [brands, models, years, conditions, locations] = uniqueValues.map(
      (result) => result.map((item) => item.value)
    );

    // For numerical ranges, we'll get min and max
    const priceRange = await db
      .select({
        min: sql<number>`MIN(${CarsTable.price})`,
        max: sql<number>`MAX(${CarsTable.price})`,
      })
      .from(CarsTable)
      .then((result) => result[0]);

    return {
      success: true,
      data: [
        {
          label: "Brand",
          value: brands,
        },
        {
          label: "Model",
          value: models,
        },
        {
          label: "Price",
          value: priceRange,
        },
        {
          label: "Year",
          value: years,
        },
        {
          label: "Condition",
          value: conditions,
        },
        {
          label: "Location",
          value: locations,
        },
      ],
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not fetch filters" };
  }
}
