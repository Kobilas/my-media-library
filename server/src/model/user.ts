import { QueryResult } from "pg";
import { pool } from "../database/pgDb";

export interface User {
    uuid: string,
    email: string,
    password_hash?: string,
};

// userParams -> [email, password]
export function createUser(userParams: Array<string>): Promise<User> {
    const text = `INSERT INTO "user"(
        email, password_hash)
        VALUES($1, $2)
        RETURNING *;`;
    return pool
        .query(text, userParams)
        .then((res: QueryResult) => {
            var row = res.rows[0];
            const newUser:User = {
                uuid: row["uuid"],
                email: row["email"],
            };
            console.log(newUser);
            return Promise.resolve(newUser);
        })
        .catch((err: Error) => {
            console.error(err.stack);
            return Promise.reject(err);
        });
};

export function findUserByEmail(email: string): Promise<User> {
    const text = `SELECT *
    FROM "user"
    WHERE email = $1`;
    return pool
        .query(text, [email])
        .then((res: QueryResult) => {
            var row = res.rows[0];
            const fndUser:User = {
                uuid: row["uuid"],
                email: row["email"],
                password_hash: row["password_hash"],
            };
            console.log(fndUser);
            return Promise.resolve(fndUser);
        })
        .catch((err: Error) => {
            console.error(err.stack);
            return Promise.reject(err);
        });
};

export function findUserByUuid(uuid: string): Promise<User> {
    const text = "SELECT * FROM user WHERE uuid = $1";
    return pool
        .query(text, [uuid])
        .then((res: QueryResult) => {
            var row = res.rows[0];
            const fndUser:User = {
                uuid: row["uuid"],
                email: row["email"],
                password_hash: row["password_hash"],
            };
            console.log(fndUser);
            return Promise.resolve(fndUser);
        })
        .catch((err: Error) => {
            console.error(err.stack);
            return Promise.reject(err);
        });
};

export function listUsers(): void {
    const text = "SELECT * FROM users";
    pool
        .query(text)
        .catch(err => console.error(err.stack));
}