import { Request, Response } from "express";
import Annotation from '../entity/annotation.js';
import { AnnotationWorkFLowItem } from '../../utils/WidgetDataUtility.js'
import Saved from '../entity/saved.js';


async function getItems() {
    const Items = await Annotation.find();
    return Items;
}

async function getItemsList() {
    const Items = await Annotation.find({"is_curated":0}).select({ entryid: 1, metadata: 1, user: 1 });
    return Items;
}

async function getApprovalItemsList() {
    const Items = await Annotation.find({"is_curated":1}, {"is_approved":0}).select({ entryid: 1, metadata: 1, user: 1 });
    return Items;
}

async function getApprovedItemsList() {
    const Items = await Annotation.find({"is_curated":1}, {"is_approved":1}).select({ entryid: 1, metadata: 1, user: 1 });
    return Items;
}

async function getItem(id: any) {
    const Item = await Annotation.findOne({ entryid: id });
    return Item;
}

async function deleteItem(id: any) {
    await Annotation.findByIdAndDelete({ _id: id });
    return {"code": 1, "message": "Successfully Deleted Item"};
}

async function updateItem(id: any, reqBody: any) {
    await Annotation.findOneAndUpdate({entryid: id}, reqBody);
    return {"code": 1 , "message": "Successfully Updated Item"}
}

async function updateApprovalItem(id: any, reqBody: any) {
    reqBody["is_approved"] = 1;
    await Annotation.findOneAndUpdate({entryid: id}, reqBody);
    return {"code": 1 , "message": "Successfully Updated Item"}
}

async function updateRequestApprovalItem(id: any, reqBody: any) {
    reqBody["is_curated"] = 1;
    reqBody["is_approval_requested"] = 1;
    await Annotation.findOneAndUpdate({entryid: id}, reqBody);
    return {"code": 1 , "message": "Successfully Updated Item"}
}


async function addItem(reqBody: any) {
    reqBody["status"] = "Submitted"
    await Saved.findOneAndUpdate({entryid: reqBody.entryid}, reqBody);
    let entryid = reqBody["entryid"].replace("DRAFT", "ANNOTATION")
    reqBody["entryid"] = entryid;
    reqBody['is_curated'] = 0
    reqBody['is_approval_requested'] = 0
    reqBody['is_approved'] = 0
    var newItem = new Annotation(reqBody);
    await newItem.save();
    return {"code": 1, "entryid": newItem.entryid, "entry": newItem, "Annotationurl": "http://localhost:3000/view/Annotation/" + newItem._id};;
}

export let allAnnotation = async (req: Request, res: Response) => {
    getItems().then(function (FoundItems) {
        res.send(FoundItems);
    });
};

export let annotationList = async (req: Request, res: Response) => {
    getItemsList().then(function (FoundItems) {
        var resultItems: AnnotationWorkFLowItem[] = [];
        FoundItems.forEach(function (value, index) {
            var resItem: AnnotationWorkFLowItem = {
                id: index + 1,
                entryid: value.entryid,
                authoremail: value.user.email,
                authorname: value.user.name,
                saveddate: "2023-01-01",
                imagingmethod: value.metadata.imagingmethod,
                title: value.metadata.name
            }
            resultItems.push(resItem)
        });
        res.send(resultItems)
    });
};

export let approvalList = async (req: Request, res: Response) => {
    getApprovalItemsList().then(function (FoundItems) {
        var resultItems: AnnotationWorkFLowItem[] = [];
        FoundItems.forEach(function (value, index) {
            var resItem: AnnotationWorkFLowItem = {
                id: index + 1,
                entryid: value.entryid,
                authoremail: value.user.email,
                authorname: value.user.name,
                saveddate: "2023-01-01",
                imagingmethod: value.metadata.imagingmethod,
                title: value.metadata.name
            }
            resultItems.push(resItem)
        });
        res.send(resultItems)
    });
};

export let approvedList = async (req: Request, res: Response) => {
    getApprovedItemsList().then(function (FoundItems) {
        var resultItems: AnnotationWorkFLowItem[] = [];
        FoundItems.forEach(function (value, index) {
            var resItem: AnnotationWorkFLowItem = {
                id: index + 1,
                entryid: value.entryid,
                authoremail: value.user.email,
                authorname: value.user.name,
                saveddate: "2023-01-01",
                imagingmethod: value.metadata.imagingmethod,
                title: value.metadata.name
            }
            resultItems.push(resItem)
        });
        res.send(resultItems)
    });
};

export let getAnnotation = (req: Request, res: Response) => {
    getItem(req.params.id).then(function (FoundItem) {
        res.send(FoundItem);
    });
};

export let deleteAnnotation = (req: Request, res: Response) => {
    deleteItem(req.params.id).then(function (ResultMessage) {
        res.send(ResultMessage);
    });
};

export let updateAnnotation = (req: Request, res: Response) => {
    updateItem(req.params.id, req.body).then(function (ResultMessage) {
        res.send(ResultMessage);
    });
};

export let updateApproval = (req: Request, res: Response) => {
    updateApprovalItem(req.params.id, req.body).then(function (ResultMessage) {
        res.send(ResultMessage);
    });
};

export let updateRequestApproval = (req: Request, res: Response) => {
    updateRequestApprovalItem(req.params.id, req.body).then(function (ResultMessage) {
        res.send(ResultMessage);
    });
};

export let addAnnotation = (req: Request, res: Response) => {
    addItem(req.body).then(function (NewItem) {
        res.send(NewItem);
    });
};

export let addAnnotationFromSaved = (reqBody: any, res: Response) => {
    addItem(reqBody).then(function (NewItem) {
        res.send(NewItem);
    });
};