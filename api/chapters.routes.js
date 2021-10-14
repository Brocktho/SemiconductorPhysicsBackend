import express from "express";
import chaptersController from "./chapters.Controller.js";

const router = express.Router();

router.route("/newChapter").post(chaptersController.apiPostChapter);

router.route("/").get(chaptersController.apiGetChapters);

export default router;
