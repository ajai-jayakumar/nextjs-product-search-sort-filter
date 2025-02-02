import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const conditionEnum = pgEnum("condition_enum", ["New", "Used"]);
export const driveTrainEnum = pgEnum("drivetrain_enum", ["AWD", "FWD", "RWD"]);

export const CarsTable = pgTable("cars", {
  id: uuid("id").primaryKey().defaultRandom(),
  brand: varchar("brand", { length: 50 }).notNull(),
  model: varchar("model", { length: 50 }).notNull(),
  year: integer("year").notNull(),
  price: doublePrecision("price").notNull(),
  range_km: doublePrecision("range_km").notNull(),
  color: varchar("color", { length: 30 }).notNull(),
  condition: conditionEnum("condition").notNull(),
  battery_capacity_kWh: doublePrecision("battery_capacity_kWh").notNull(),
  charging_speed_kW: doublePrecision("charging_speed_kW").notNull(),
  seats: integer("seats").notNull(),
  drivetrain: driveTrainEnum("drivetrain").notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  autopilot: boolean("autopilot").notNull(),
  kilometer_count: doublePrecision("kilometer_count").notNull(),
  accidents: boolean("accidents").notNull(),
  accident_description: text("accident_description"),
  images: jsonb("images").notNull().default([]),
});

export type Cars = InferSelectModel<typeof CarsTable>;
