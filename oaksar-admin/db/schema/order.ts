import { relations } from 'drizzle-orm';
import {
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    serial,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';

import { product, supplier } from './inventory';

export const status = pgEnum('status', ['pending', 'shipped', 'received']);

export const order = pgTable('order', {
    id: serial('id').primaryKey(),
    productId: integer('product_id').references(() => product.id, { onDelete: 'set null' }),
    supplierId: integer('supplier_id').references(() => supplier.id, { onDelete: 'set null' }),
    quantity: integer('quantity').notNull(),
    orderDate: timestamp('order_date'),
    expectedDeliveryDate: timestamp('expected_delivery_date:'),
    status: status('status').default('pending'),
    reorderLevel: integer('reorder_level').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date())
        .defaultNow(),
});

export const orderRelation = relations(order, ({ one }) => ({
    product: one(product, {
        fields: [order.productId],
        references: [product.id],
    }),
    supplier: one(supplier, {
        fields: [order.supplierId],
        references: [supplier.id],
    }),
}));

export type OrderType = typeof order.$inferSelect;
export type OrderInsert = typeof order.$inferInsert;
