import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { order } from './order';
import { sale } from './sale';

export const product = pgTable('product', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    price: integer('price').notNull(),
    imgUrls: text('img_url').array(),
    width: text('width'),
    height: text('height'),
    length: text('length'),
    weight: text('weight'),
    colors: text('colors').array(),
    categoryId: integer('category_id').references(() => category.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date())
        .defaultNow(),
});

export const category = pgTable('category', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
});

export const supplier = pgTable('supplier', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    phone: text('phone').notNull(),
    email: text('email').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date())
        .defaultNow(),
});

export const productRelation = relations(product, ({ one, many }) => ({
    category: one(category, {
        fields: [product.categoryId],
        references: [category.id],
    }),
    orders: many(order),
    sales: many(sale),
}));

export const categoryRelation = relations(category, ({ many }) => ({
    products: many(product),
}));

export const inventory = pgTable('inventory', {
    id: serial('id').primaryKey(),
    productId: integer('product_id').references(() => product.id, { onDelete: 'set null' }),
    quantity: integer('quantity').notNull(),
    reorderLevel: integer('reorder_level').notNull(),
    leadTime: integer('lead_time').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date())
        .defaultNow(),
});

export const inventoryRelation = relations(inventory, ({ one }) => ({
    product: one(product, {
        fields: [inventory.productId],
        references: [product.id],
    }),
}));

export type ProductType = typeof product.$inferSelect;
export type ProductInsert = typeof product.$inferInsert;

export type CategoryType = typeof category.$inferSelect;
export type CategoryInsert = typeof category.$inferInsert;

export type InventoryType = typeof inventory.$inferSelect;
export type InventoryInsert = typeof inventory.$inferInsert;

export type SupplierType = typeof supplier.$inferSelect;
export type SupplierInsert = typeof supplier.$inferInsert;
