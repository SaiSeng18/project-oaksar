import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from '@/db/schema';

declare global {
    var globalDb: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === 'production') {
    db = drizzle(postgres(process.env.DATABASE_URL as string, { prepare: true }), {
        schema,
    });
} else {
    if (!global.globalDb)
        global.globalDb = drizzle(postgres(process.env.DATABASE_URL as string, { prepare: true }), {
            schema,
        });

    db = global.globalDb;
}

export { db };
