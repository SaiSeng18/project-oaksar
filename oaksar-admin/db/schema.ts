import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const product = pgTable('product', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    price: integer('price').notNull(),
    categoryId: integer('category_id').references(() => category.id),
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

export const productRelation = relations(product, ({ one, many }) => ({
    category: one(category, {
        fields: [product.categoryId],
        references: [category.id],
    }),
}));

export const categoryRelation = relations(category, ({ many }) => ({
    products: many(product),
}));

export const inventory = pgTable('inventory', {
    inventoryId: serial('id').primaryKey(),
    productId: integer('product_id').references(() => product.id),
    quantityOnHand: integer('quantity_on_hand').notNull(),
    reorderPoint: integer('reorder_point').notNull(),
    safetyStock: integer('safety_stock').notNull(),
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
// export type ProductInsert = typeof product.$inferInsert;

export type CategoryType = typeof category.$inferSelect;
// export type CategoryInsert = typeof category.$inferInsert;

export type InventoryType = typeof inventory.$inferSelect;
// export type InventoryInsert = typeof inventory.$inferInsert;
