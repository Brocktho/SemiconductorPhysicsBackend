import express from "express";
import chaptersController from "./chapters.controller.js";

const router = express.Router();

router.route("/newChapter").post(chaptersController.apiPostChapter);

router.route("/").get(chaptersController.apiGetChapters);

export default router;
