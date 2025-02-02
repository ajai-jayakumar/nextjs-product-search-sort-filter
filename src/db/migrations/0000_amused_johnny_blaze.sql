CREATE TYPE "public"."condition_enum" AS ENUM('New', 'Used');--> statement-breakpoint
CREATE TYPE "public"."drivetrain_enum" AS ENUM('AWD', 'FWD', 'RWD');--> statement-breakpoint
CREATE TABLE "cars" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand" varchar(50) NOT NULL,
	"model" varchar(50) NOT NULL,
	"year" integer NOT NULL,
	"price" double precision NOT NULL,
	"range_km" double precision NOT NULL,
	"color" varchar(30) NOT NULL,
	"condition" "condition_enum" NOT NULL,
	"battery_capacity_kWh" double precision NOT NULL,
	"charging_speed_kW" double precision NOT NULL,
	"seats" integer NOT NULL,
	"drivetrain" "drivetrain_enum" NOT NULL,
	"location" varchar(100) NOT NULL,
	"autopilot" boolean NOT NULL,
	"kilometer_count" double precision NOT NULL,
	"accidents" boolean NOT NULL,
	"accident_description" text,
	"images" jsonb DEFAULT '[]'::jsonb NOT NULL
);
