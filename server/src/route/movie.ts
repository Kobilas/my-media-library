import express, { Router } from "express";

import { root, addToWatched, listWatched } from "../controller/movie";

const router = Router();

router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

router.get("/", root);

router.get("/watch", listWatched);

router.post("/watch", addToWatched);

module.exports = router;