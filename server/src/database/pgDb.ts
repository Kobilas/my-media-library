import { Pool } from "pg";

export const pool = new Pool({
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    max: 10,
});