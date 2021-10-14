let chapters

export default class chaptersDAO{

    static async injectDB(conn){
        if(chapters){
            return
        }
        try{
            chapters = await conn.db(process.env.CHAPTER_NS).collection("chapters")
        } catch(error){
            console.error(`unable to connect in chaptersDAO: ${e}`);
        }
    }

    static async getChapters(){
        let cursor
        try{
            cursor = await chapters.find()
            const chaptersList = await cursor.toArray();
            const totalChapters = await chapters.countDocuments();
            return {chaptersList, totalChapters}
        } catch (error){
            console.error(`Unable to issue find command, ${error}`);
            return {chaptersList:[], totalChapters:0}
        }
    }

    static async postChapter({title, number, path}){
    let output = { status: 400, message: "Failed to post Chapter.", path: "/newChapter" };
    try {
      const notUnique = await chapters.findOne({number});
      if (!notUnique) {
        await chapters.insertOne({
          title,
          number,
          created: Date.now(),
          path,
          toggle: null,
          set: null
        });
        console.log("inserted")
        output = {status:200, message:"Chapter created!", path:"/newChapter"};
        return output;
      } else {
        console.log("didn't insert")
        output = {status:409, message:"That Chapter already exists.", path:"/newChapter"};
        return output;
      }
    } catch (error) {
      console.log(error);
      console.error(`failed to upload Chapter ${error}`);
      return output;
    }
    }

}