import { Request, Response } from "express";
import Saved from '../entity/saved.js';
import { addAnnotationFromSaved } from "./annotationController.js";
import { SavedWorkFLowItem } from '../../utils/WidgetDataUtility.js'


async function getItems() {
    const Items = await Saved.find();
    return Items;
}

async function getItemsList(useremail:any) {
    const Items = await Saved.find({"user.email": useremail},).select({ entryid: 1, metadata: 1, user: 1, status: 1 });
    return Items;
}

async function getItem(id: any) {
    const Item = await Saved.findOne({ "entryid": id });
    return Item;
}

async function deleteItem(id: any) {
    await Saved.findByIdAndDelete({ _id: id });
    return {"code": 1, "message": "Successfully Deleted Item"};
}

async function updateItem(id: any, reqBody: any) {
    await Saved.findOneAndUpdate({entryid: id}, reqBody);
    return {"code": 1, "entryid": id , "message": "Successfully Updated Item"}
}

export async function updateSaveStatus(reqBody: any) {
    await Saved.findByIdAndUpdate(reqBody.id, reqBody);
    return {"code": 1 , "message": "Successfully Updated Item"}
}

async function addItem(reqBody: any) {
    reqBody["entryid"] = "DRAFT-" + Math.floor(Math.random()*9000) + 1000;
    reqBody["status"] = "Saved";
    var newItem = new Saved(reqBody);
    await newItem.save();
    return {"code": 1, "entryid": newItem.entryid, "entry": newItem, "savedurl": "http://localhost:3000/view/saved/" + newItem.entryid};;
}

export let allSaved = async (req: Request, res: Response) => {
    getItems().then(function (FoundItems) {
        res.send(FoundItems);
    });
};

export let savedList = async (req: Request, res: Response) => {
    getItemsList(req.params.useremail).then(function (FoundItems) {
        var resultItems: SavedWorkFLowItem[] = [];
        FoundItems.forEach(function (value, index) {
            var resItem: SavedWorkFLowItem = {
                id: index + 1,
                entryid: value.entryid,
                authoremail: value.user.email,
                authorname: value.user.name,
                saveddate: "2023-01-01",
                imagingmethod: value.metadata.imagingmethod,
                title: value.metadata.name,
                status: value.status
            }
            resultItems.push(resItem)
        });
        res.send(resultItems)
    });
};

export let getSaved = (req: Request, res: Response) => {
    getItem(req.params.id).then(function (FoundItem) {
        res.send(FoundItem);
    });
};

export let deleteSaved = (req: Request, res: Response) => {
    deleteItem(req.params.id).then(function (ResultMessage) {
        res.send(ResultMessage);
    });
};

export let updateSaved = (req: Request, res: Response) => {
    updateItem(req.params.id, req.body).then(function (ResultMessage) {
        res.send(ResultMessage);
    });
};

export let addSaved = (req: Request, res: Response) => {
    addItem(req.body).then(function (NewItem) {
        res.send(NewItem);
    });
};