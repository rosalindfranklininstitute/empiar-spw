import { Request, Response } from "express";
import Published from '../entity/published.js'
import { PublisedWorkFLowItem } from '../../utils/WidgetDataUtility.js'
import { config } from "process";

async function getItems() {
    const Items = await Published.find();
    return Items;
}

async function getItemsList() {
    const Items = await Published.find().select({ _id: 1, metadata: 1, user: 1 });
    return Items;
}

async function getItem(id: any) {
    const Item = await Published.findOne({ _id: id });
    return Item;
}

async function deleteItem(id: any) {
    await Published.findByIdAndDelete({ _id: id });
    return "Successfully Deleted Item";
}

async function updateItem(id: any, reqBody: any) {
    await Published.findByIdAndUpdate(id, reqBody);
    return "Successfully Updated Item";
}

async function addItem(reqBody: any) {
    const randomId = Math.floor(Math.random()*90000) + 10000;
    reqBody["entryid"] = "SPW-" +  randomId;
    var newItem = new Published(reqBody);
    await newItem.save();
    return {"code": 1, "entryid": newItem.entryid, "entry": newItem, "doi": "http://localhost:3000/view/published/" + newItem._id};;
}

export let allPublished = async (req: Request, res: Response) => {
    getItems().then(function (FoundItems) {
        res.send(FoundItems);
    });
};

export let publishedList = async (req: Request, res: Response) => {
    getItemsList().then(function (FoundItems) {
        var resultItems: PublisedWorkFLowItem[] = [];
        FoundItems.forEach(function (value, index) {
            var resItem: PublisedWorkFLowItem = {
                id: index + 1,
                entryid: value._id,
                authoremail: value.user.email,
                authorname: value.user.name,
                publisheddate: "2023-01-01",
                imagingmethod: value.metadata.imagingmethod,
                title: value.metadata.name
            }
            resultItems.push(resItem)
        });
        res.send(resultItems)
    });
};

export let getPublished = (req: Request, res: Response) => {
    getItem(req.params.id).then(function (FoundItem) {
        res.send(FoundItem);
    });
};

export let addPublished = (req: Request, res: Response) => {
    addItem(req.body).then(function (NewItem) {
        res.send(NewItem);
    });
};

//Disabing delete/update of Published entries
// export let deletePublished = (req: Request, res: Response) => {
//     deleteItem(req.params.id).then(function(ResultMessage){
//         res.send(ResultMessage);
//     });
// };

// export let updatePublished = (req: Request, res: Response) => {
//     updateItem(req.params.id, req.body).then(function(ResultMessage){
//         res.send(ResultMessage);
//     });
// };