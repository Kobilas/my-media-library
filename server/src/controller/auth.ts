import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { createUser, findUserByEmail, User } from "../model/user";
import { Request, Response } from "express";

export function root(req: Request, res: Response): void {
    res.send("auth root");
};

export function register(req: Request, res: Response): void {
    createUser([req.body.email, bcrypt.hashSync(req.body.password)])
        .then((newUser: User) => {
            const tok = jwt.sign({uuid: newUser.uuid}, process.env["JWT_SECRET_KEY"]!, {
                expiresIn: process.env["JWT_EXPIRES_IN"]
            });
            return res.status(200).send({"user": newUser, "token": tok, "expires_in": process.env["JWT_EXPIRES_IN"]});
        })
        .catch((err: Error) => {
            console.error(err.stack);
            return res.status(500).send("Server error");
        });
};

export function login(req: Request, res: Response): void {
    const email = req.body.email;
    findUserByEmail(email)
        .then((fndUser: User) => {
            if (!fndUser) return res.status(404).send("User not found");
            if(!bcrypt.compareSync(req.body.password, fndUser.password_hash!)) return res.status(401).send("Incorrect password");
            const tok = jwt.sign({uuid: fndUser.uuid}, process.env["JWT_SECRET_KEY"]!, {
                expiresIn: process.env["JWT_EXPIRES_IN"]
            });
            const ret:User = {
                uuid: fndUser.uuid,
                email: fndUser.email,
            };
            return res.status(200).send({"user": ret, "token": tok, "expires_in": process.env["JWT_EXPIRES_IN"]});
        })
        .catch((err: Error) => {
            console.error(err.stack);
            return res.status(500).send("Server error");
        });
}