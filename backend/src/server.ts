import express from "express";
import {MongoClient} from "mongodb";
import cors from "cors";
import {v4 as uuidv4} from "uuid";
import {isValidUrl} from "./utils/urlValidator";

const app = express();
app.use(express.json());
app.use(cors());

const mongoUrl = "mongodb://mongodb:27017";
const client = new MongoClient(mongoUrl);
const dbName = "linkshortener";

async function connectToDb() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

connectToDb();

app.post("/", async (req, res) => {
  const {url} = req.body;

  if (!isValidUrl(url)) {
    return res.status(400).json({error: "Invalid URL provided"});
  }

  const id = uuidv4().slice(0, 8);

  try {
    const db = client.db(dbName);
    const links = db.collection("links");
    await links.insertOne({id, originalUrl: url});
    const shortUrl = `http://localhost:3000/${id}`;
    res.status(201).json({shortUrl});
  } catch (err) {
    res.status(500).json({error: "Failed to create short link"});
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const db = client.db(dbName);
    const links = db.collection("links");
    const link = await links.findOne({id});
    console.log(link);

    if (link) {
      return res.status(200).json({url: link.originalUrl});
    } else {
      res.status(404).json({error: "Link not found"});
    }
  } catch (err) {
    res.status(500).json({error: "Failed to retrieve link"});
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
