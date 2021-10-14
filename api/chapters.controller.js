import chaptersDAO from "../dao/chaptersDAO.js";

export default class ChaptersController {
  static async apiGetChapters(req, res, next) {
    const { chaptersList, totalNumchapters } = await chaptersDAO.getChapters();

    let response = {
      chapters: chaptersList,
      total_results: totalNumchapters,
    };
    res.json(response);
  }

  static async apiPostChapter(req, res, next) {
      console.log(req);
      const data = req.body
    try {
      const { status, message, path } = await chaptersDAO.postChapter({title: data.title, number: data.number, path: data.path});
      res.status(status).json({ message: message, path: path });
    } catch {
      res.status(500).json({ message: "failed to create Chapter" });
    }
  }
}
