DROP TABLE "posts_table";--> statement-breakpoint
DROP TABLE "users_table";--> statement-breakpoint
ALTER TABLE "inventory" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "width" integer;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "height" integer;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "length" integer;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "weight" integer;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "colors" text[];