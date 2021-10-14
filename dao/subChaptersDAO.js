let subChapters

export default class subChaptersDAO{

    static async injectDB(conn){
        if(subChapters){
            return
        }
        try{
            subChapters = await conn.db(process.env.CHAPTER_NS).collection("subChapters")
        } catch(error){
            console.error(`unable to connect in subChaptersDAO: ${e}`);
        }
    }

    static async getsubChapters({
    }={}){
        let cursor
        try{
            cursor = await subChapters.find()
            const subChaptersList = await cursor.toArray();
            const totalsubChapters = await subChapters.countDocuments(query);
            return {subChaptersList, totalsubChapters}
        } catch (error){
            console.error(`Unable to issue find command, ${error}`);
            return {subChaptersList:[], totalsubChapters:0}
        }
    }
}