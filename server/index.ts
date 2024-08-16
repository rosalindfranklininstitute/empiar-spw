import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as savedController from '../src/localapi/controllers/savedController.js';
import * as publishedController from '../src/localapi/controllers/publishedController.js';
import * as templateController from '../src/localapi/controllers/templateController.js';
import * as annotationController from '../src/localapi/controllers/annotationController.js';



dotenv.config();
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
app.post("/Submit", annotationController.addAnnotation);
app.delete("/Saved/:id", savedController.deleteSaved);
app.get("/SavedList/:useremail", savedController.savedList);

// Annotation SPW
app.get("/Annotation", annotationController.addAnnotation);
app.get("/Annotation/:id", annotationController.getAnnotation);
app.post("/Annotation", annotationController.addAnnotation);
app.put("/Annotation/:id", annotationController.updateAnnotation);
app.delete("/Annotation/:id", annotationController.deleteAnnotation);
app.get("/AnnotationList", annotationController.annotationList);

// Approval SPW
app.put("/approve/:id", annotationController.updateApproval);
app.put("/requestapproval/:id", annotationController.updateRequestApproval);
app.get("/ApprovalList", annotationController.approvalList);
app.get("/approvedlist", annotationController.approvedList);


// Published SPW
app.get("/Published", publishedController.allPublished);
app.get("/PublishedList", publishedController.publishedList);
app.get("/Published/:id", publishedController.getPublished);
app.post("/Published", publishedController.addPublished);

// Tempalte SPW
app.get("/Template", templateController.allTemplate);
app.get("/Template/:id", templateController.getTemplate);
app.get("/TemplateList", templateController.templateList);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});