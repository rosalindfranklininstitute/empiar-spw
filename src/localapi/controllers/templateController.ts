import { Request, Response } from "express";
import Template from '../entity/template.js';
import { TemplateWorkFlowItem } from '../../utils/WidgetDataUtility.js'


async function getItems() {
    const Items = await Template.find();
    return Items;
}

async function getItemsList() {
    const Items = await Template.find().select({ _id: 1, metadata: 1, user: 1 });
    return Items;
}

async function getItem(id: any) {
    const Item = await Template.findOne({ _id: id });
    return Item;
}

async function deleteItem(id: any) {
    await Template.findByIdAndDelete({ _id: id });
    return "Successfully Deleted Item";
}

async function updateItem(id: any, reqBody: any) {
    await Template.findByIdAndUpdate(id, reqBody);
    return "Successfully Updated Item";
}

async function addItem(reqBody: any) {
    var newItem = new Template(reqBody);
    await newItem.save();
    return newItem;
}

export let allTemplate = async (req: Request, res: Response) => {
    getItems().then(function (FoundItems) {
        res.send(FoundItems);
    });
};

export let templateList = async (req: Request, res: Response) => {
    getItemsList().then(function (FoundItems) {
        var resultItems: TemplateWorkFlowItem[] = [];
        FoundItems.forEach(function (value, index) {
            var resItem: TemplateWorkFlowItem = {
                id: index + 1,
                entryid: value._id,
                authoremail: value.user.email,
                authorname: value.user.name,
                imagingmethod: value.metadata.imagingmethod,
                title: value.metadata.name,
                studydescription: value.metadata.studydescription,
                biologicalentity: value.metadata.biologicalentity
            }
            resultItems.push(resItem)
        });
        res.send(resultItems)
    });
};

export let getTemplate = (req: Request, res: Response) => {
    getItem(req.params.id).then(function (FoundItem) {
        res.send(FoundItem);
    });
};

// Disabling delete/ update or add Template feature for now
// export let deleteTemplate = (req: Request, res: Response) => {
//     deleteItem(req.params.id).then(function(ResultMessage){
//         res.send(ResultMessage);
//     });
// };

// export let updateTemplate = (req: Request, res: Response) => {
//     updateItem(req.params.id, req.body).then(function(ResultMessage){
//         res.send(ResultMessage);
//     });
// };

// export let addTemplate = (req: Request, res: Response) => {
//     addItem(req.body).then(function(NewItem){
//         res.send(NewItem);
//     });
// };