import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

//TODO: replace with variable from env file - DATABASE_URL
const pg = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);
export const db = drizzle({ client: pg });