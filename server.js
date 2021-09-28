const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const {MongoClient} = require("mongodb");
const PORT = process.env.PORT || 5000;
if (PORT == null || PORT == ""){
    PORT = 8000;
}

const app = express();

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    console.log(databasesList.databases);
};

async function main(){
    const uri = "mongodb+srv://Brocktho:CrystalPassagefireZ9126!@semiconductorphysics.mkr0a.mongodb.net/ChapterData?retryWrites=true&w=majority"
    const client = new MongoClient(uri);
    try {
    await client.connect().then(client => {


    app.use(bodyParser.json());

    app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
    });
    app.get("/API/ChapterData", (req, res, next) => {
        client.connect().then(client => {
        const db = client.db("ChapterData");
        db.collection("Chapters").find().toArray()
        .then(results => {
            const subChapters = results[0];
            res.status(200).json({ subChapters: subChapters.subChapters})
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
    });

    app.post("/API/ChapterPage", (req, res, next) => {
    const { poster, data } = req.body;

    if (!poster || poster.trim().length === 0 || !data || data === undefined) {
        return res.status(422).json({ message: "Invalid Input." });
    }
    const createdPost = {
        id: uuid(),
        poster,
        data,
    };

    db.subChapters.push(createdPost);

    res
        .status(201)
        .json({ message: "Created new post.", ChapterPage: createdPost });
    });

    app.listen(PORT);
    
    }).catch(error =>console.error(error));
    } finally{
        await client.close();
    };
};
main().catch(console.error);
