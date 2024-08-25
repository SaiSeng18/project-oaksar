import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { customer } from './customer';
import { product, supplier } from './inventory';
import { status } from './order';

export const sale = pgTable('sale', {
    id: serial('id').primaryKey(),
    customerId: integer('product_id').references(() => customer.id, { onDelete: 'set null' }),
    saleDate: timestamp('sale_date').notNull().defaultNow(),
    totalAmount: integer('total_amount').notNull(),
    status: status('status').default('pending'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date())
        .defaultNow(),
});

export const saleItem = pgTable('sale_item', {
    id: serial('id').primaryKey(),
    saleId: integer('sale_id').references(() => sale.id, { onDelete: 'cascade' }),
    productId: integer('product_id').references(() => product.id, { onDelete: 'set null' }),
    quantity: integer('quantity').notNull(),
    pricePerUnit: integer('price_per_unit').notNull(),
    totalPrice: integer('total_price').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date())
        .defaultNow(),
});

export const saleRelation = relations(sale, ({ one, many }) => ({
    customer: one(customer, {
        fields: [sale.customerId],
        references: [customer.id],
    }),
    saleItems: many(saleItem),
}));

export type SaleType = typeof sale.$inferSelect;
export type SaleInsert = typeof sale.$inferInsert;

export type SaleItemType = typeof saleItem.$inferSelect;
export type SaleItemInsert = typeof saleItem.$inferInsert;
