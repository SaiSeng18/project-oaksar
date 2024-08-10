import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from '@/db/schema';

const sql = neon(process.env.DATABASE_URL!);

// export const db = drizzleNeon(sql, { schema });
export const db =
    process.env.NODE_ENV === 'production'
        ? drizzleNeon(sql, { schema })
        : drizzleNode(new Pool({ connectionString: process.env.DATABASE_URL_LOCAL! }), { schema });
