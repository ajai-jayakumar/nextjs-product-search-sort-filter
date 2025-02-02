"use server";

import { CarsTable } from "@/db/schema";
import { db } from "@/db";

export async function getProducts() {
  try {
    const data = await db.select().from(CarsTable);
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Could not fetch products" };
  }
}
