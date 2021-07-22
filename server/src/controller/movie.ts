import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { watchMovie } from "../model/movie";

export function root(req: Request, res: Response): void {
    res.send("movie root");
};

export function addToWatched(req: Request, res: Response): void {
    // Bearer blahblahblah
    // 01234567
    const tok = req.header("Authorization")!.substr(7);
    const session: JwtPayload = jwt.verify(tok, process.env["JWT_SECRET_KEY"]!) as JwtPayload;
    watchMovie(session["uuid"], req.body["imdb_id"])
        .then((rowCnt: number) => {
            if (rowCnt == 0) {
                console.log(Error("addToWatched: no rows inserted"));
                res.status(500).send("server error");
            }
            res.status(200).send(`inserted ${rowCnt} rows`);
        })
        .catch((err:Error) => {
            console.log(err.stack);
            res.status(500).send("server error");
        });
};

export function listWatched(req: Request, res: Response): void {

};