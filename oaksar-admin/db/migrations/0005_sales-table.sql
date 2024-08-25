CREATE TABLE IF NOT EXISTS "sale" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"sale_date" timestamp DEFAULT now() NOT NULL,
	"total_amount" integer NOT NULL,
	"status" "status" DEFAULT 'paid',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sale_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"sale_id" integer,
	"product_id" integer,
	"quantity" integer NOT NULL,
	"price_per_unit" integer NOT NULL,
	"total_price" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"phone" text,
	"email" text,
	"address" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sale" ADD CONSTRAINT "sale_product_id_customer_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."customer"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sale_item" ADD CONSTRAINT "sale_item_sale_id_sale_id_fk" FOREIGN KEY ("sale_id") REFERENCES "public"."sale"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sale_item" ADD CONSTRAINT "sale_item_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
