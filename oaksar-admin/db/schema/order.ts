import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { product, supplier } from './inventory';

export const status = pgEnum('status', ['pending', 'shipped', 'received']);

export const order = pgTable('product', {
    id: serial('id').primaryKey(),
    productId: integer('product_id').references(() => product.id, { onDelete: 'set null' }),
    supplierId: integer('supplier_id').references(() => supplier.id, { onDelete: 'set null' }),
    quantity: integer('quantity').notNull(),
    orderDate: timestamp('order_date'),
    expectedDeliveryDate: timestamp('expected_delivery_date:'),
    status: status('status').default('pending'),
    leadTime: integer('lead_time').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date())
        .defaultNow(),
});

export const orderRelation = relations(order, ({ many }) => ({
    products: many(product),
}));

export type OrderType = typeof order.$inferSelect;
export type OrderInsert = typeof order.$inferInsert;
