DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('pending', 'shipped', 'received');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "supplier" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"supplier_id" integer,
	"quantity" integer NOT NULL,
	"order_date" timestamp,
	"expected_delivery_date:" timestamp,
	"status" "status" DEFAULT 'pending',
	"reorder_level" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_product_id_product_id_fk";
--> statement-breakpoint
ALTER TABLE "product" DROP CONSTRAINT "product_category_id_category_id_fk";
--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "width" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "height" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "length" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "weight" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "inventory" ADD COLUMN "quantity" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "inventory" ADD COLUMN "reorder_level" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "inventory" ADD COLUMN "lead_time" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_supplier_id_supplier_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."supplier"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "inventory" DROP COLUMN IF EXISTS "quantity_on_hand";--> statement-breakpoint
ALTER TABLE "inventory" DROP COLUMN IF EXISTS "reorder_point";--> statement-breakpoint
ALTER TABLE "inventory" DROP COLUMN IF EXISTS "safety_stock";