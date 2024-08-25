import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const customer = pgTable('customer', {
    id: serial('id').primaryKey(),
    name: text('name'),
    phone: text('phone'),
    email: text('email'),
    address: text('address'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date())
        .defaultNow(),
});
