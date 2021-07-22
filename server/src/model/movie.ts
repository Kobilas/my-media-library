import { QueryResult } from "pg";

import { pool } from "../database/pgDb";
import { NotFoundError } from "../util/CustomError";

export interface Movie {
    imdb_id: number,
};

function findMovieById(imdb_id: number): Promise<Movie> {
    const text = `SELECT *
        FROM movie
        WHERE imdb_id = $1`;
    return pool
        .query(text, [imdb_id])
        .then((res: QueryResult) => {
            if (res.rowCount == 0) {
                return Promise.reject(new NotFoundError("findMovieById: no movie found with that imdb_id"));
            };
            var row = res.rows[0];
            const fndMovie:Movie = {
                imdb_id: row["imdb_id"],
            };
            console.log(fndMovie);
            return Promise.resolve(fndMovie);
        })
        .catch((err: Error) => {
            console.error(err.stack);
            return Promise.reject(err);
        });
};

function createMovie(imdb_id: number): Promise<Movie> {
    const text = `INSERT INTO movie(
        imdb_id)
        VALUES ($1)
        RETURNING *;`;
    return pool
        .query(text, [imdb_id])
        .then((res: QueryResult) => {
            var row = res.rows[0];
            const newMovie:Movie = {
                imdb_id: row["imdb_id"],
            };
            console.log(newMovie);
            return Promise.resolve(newMovie);
        })
        .catch((err: Error) => {
            console.error(err.stack);
            return Promise.reject(err);
        });
};

export function watchMovie(uuid: string, imdb_id: number): Promise<number> {
    const text = `INSERT INTO user_movie(
        user_id, movie_id)
        VALUES ($1, $2)`;
    findMovieById(imdb_id)
        .catch((err: Error) => {
            if (err.name == "NotFoundError") {
                createMovie(imdb_id);
            } else {
                console.log(err.stack);
                Promise.reject(Error("watchMovie: error when checking to see if movie exists"));
            }
        });
    return pool
        .query(text, [uuid, imdb_id])
        .then((res: QueryResult) => {
            if(res.rowCount >= 1) {
                return Promise.resolve(res.rowCount);
            } else {
                console.error(`res.rowCount: ${res.rowCount}
                    last query used: ${text}`);
                return Promise.reject(Error('watchMovie: INSERT query returned 0 rows'));
            }
        })
        .catch((err: Error) => {
            console.error(err.stack);
            return Promise.reject(err);
        })
};

export function listWatchedMovies(uuid: string): Promise<Array<any>> {
    const text = `SELECT *
        FROM user_movie
        INNER JOIN movie ON (user_movie.movie_id = movie.imdb_id)
        WHERE user_movie.uuid = $1`;
    return pool
        .query(text, [uuid])
        .then((res: QueryResult) => {
            return Promise.resolve(res.rows);
        })
        .catch((err: Error) => {
            console.log(err.stack);
            return Promise.reject(err);
        });
}