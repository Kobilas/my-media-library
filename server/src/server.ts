import express from "express";
import expressJwt from "express-jwt";
import { Application } from "express";
//import * as path from "path";
//import * as cors from "cors";

export class Server {
    app: Application;
    port: string;
    paths: {[key: string]: string};

    constructor() {
        this.app = express();
        this.port = process.env["PORT"] ?? "8080"; // dotenv
        this.paths = {
            auth: "/api/auth",
            home: "/api/home",
            movie: "/api/movie",
        };

        this.middlewares();
        this.routes();
    }

    middlewares() {
        //this.app.use(cors()); // enable cors (not sure if needed yet)
        this.app.use(
            expressJwt({
                secret: process.env["JWT_SECRET_KEY"]!,
                algorithms: ["HS256"],
            })
                .unless(({
                    path: [
                        "/api/auth/login",
                        "/api/auth/register",
                    ],
                })));
    }

    routes() {
        this.app.use(this.paths["auth"], require("./route/auth"));
        this.app.use(this.paths["home"], require("./route/home"));
        this.app.use(this.paths["movie"], require("./route/movie"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port: ", this.port);
        });
    }
}