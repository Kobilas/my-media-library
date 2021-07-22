import express from "express";
import { Router } from "express";

import { root, register, login } from "../controller/auth";

const router = Router();

router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

router.get("/", root);

router.post("/register", register);

router.post("/login", login);

router.get("/users", function(req, res) {
    console.log("hi");
    res.send("hi");
});

module.exports = router;