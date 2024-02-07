import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as savedController from '../src/localapi/controllers/savedController.js';
import * as publishedController from '../src/localapi/controllers/publishedController.js';
import * as templateController from '../src/localapi/controllers/templateController.js';



dotenv.config();

console.log('*************');
console.log(process.env.MONGO_DB_URI);

const app: Express = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// API Endpoints
// Saved SPW
app.get("/Saved", savedController.allSaved);
app.get("/Saved/:id", savedController.getSaved);
app.post("/Saved", savedController.addSaved);
app.put("/Saved/:id", savedController.updateSaved);
app.delete("/Saved/:id", savedController.deleteSaved);

// Published SPW
app.get("/Published", publishedController.allPublished);
app.get("/PublishedList", publishedController.publishedList);
app.get("/Published/:id", publishedController.getPublished);
app.post("/Published", publishedController.addPublished);

// Tempalte SPW
app.get("/Template", templateController.allTemplate);
app.get("/Template/:id", templateController.getTemplate);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});