    import app from './server.js';
    import mongodb from 'mongodb';
    import dotenv from 'dotenv';
    import chaptersDAO from "./dao/chaptersDAO.js";

    async function main(){
        dotenv.config()

        const connectionOptions = {
            maxPoolSize: process.env.MONGO_MAX_POOL_SIZE,
            wtimeoutMS: process.env.MONGO_TIMEOUT,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        
        const client = new mongodb.MongoClient(process.env.CHAPTER_DB_URI, connectionOptions);

        const port = process.env.PORT || 8000;

        try{
        await client.connect()
        await chaptersDAO.injectDB(client)
            
        app.listen(port, () =>{
            console.log(`Listening on port ${port}`);
        })
        } catch(error){
            console.error(error.stack);
            process.exit(1);
        }
    }
    main().catch(console.error);