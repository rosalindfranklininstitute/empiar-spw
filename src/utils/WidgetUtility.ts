import { ListItemReferenceProps } from '../utils/WidgetDataUtility';
import html2canvas from 'html2canvas';
import configData from "../static/config.json";
import { readFile } from "fs/promises";
import { UserContext } from './UserContext';
import { useContext } from 'react';

const _ = require('lodash');

export let user:any = {}

export function setUser(userData:any){
    user = userData
}

export async function 
LoadWidgetReferenceList(widgetData: any): Promise<any> {
    let correctedListReference: Array<ListItemReferenceProps> = [];
    if (widgetData) {
        widgetData.map((workflowStepData: any, index: number) => {

            if (
                "method" in workflowStepData &&
                "ordernumber" in workflowStepData
            ) {
                const stepKey: string = stepKeyToTitleConverter(workflowStepData["method"]);
                if (stepKey !== "") {

                    let correctedListReferenceItem: ListItemReferenceProps = {
                        id: stepKey + workflowStepData["ordernumber"],
                        stepKey: stepKey,
                        stepTitle: workflowStepData["method"],
                        orderNumber: workflowStepData["ordernumber"],
                        stepData: workflowStepData
                    }
                    correctedListReference.push(correctedListReferenceItem);
                }
            }
        });
        return correctedListReference;
    }
}

function stepKeyToTitleConverter(searchValue: string, isKeyRequired: boolean = true): string {
    let convertedValue = "";
    const widgetStepMenus = [
        {
            "name": "Chemical Fixation",
            "key": "1",
            "stepkey": "cf",
            "color": "#03A9F4"
        },
        {
            "name": "Plunge Freezing",
            "key": "2",
            "stepkey": "pf",
            "color": "#03A9F4"
        },
        {
            "name": "High Pressure Freezing",
            "key": "3",
            "stepkey": "hpf",
            "color": "#03A9F4"
        },
        {
            "name": "Staining",
            "key": "4",
            "stepkey": "st",
            "color": "#00BCD4"
        },
        {
            "name": "Dehydration",
            "key": "5",
            "stepkey": "dh",
            "color": "#009688"
        },
        {
            "name": "Rinsing",
            "key": "6",
            "stepkey": "ri",
            "color": "#4CAF50"
        },
        {
            "name": "Infiltration",
            "key": "7",
            "stepkey": "if",
            "color": "#8BC34A"
        },
        {
            "name": "Incubation",
            "key": "8",
            "stepkey": "ic",
            "color": "#C0CA33"
        },
        {
            "name": "Oven Curing",
            "key": "9",
            "stepkey": "oc",
            "color": "#2196F3"
        },
        {
            "name": "Uv Polymerisation",
            "key": "10",
            "stepkey": "uvp",
            "color": "#2196F3"
        },
        {
            "name": "Freeze Substitution",
            "key": "11",
            "stepkey": "fs",
            "color": "#ff8c00 "
        }
    ]
    const fetchStep = widgetStepMenus.find((element) => (element.name == searchValue || element.stepkey == searchValue));
    if (fetchStep) {
        if (isKeyRequired) {
            convertedValue = fetchStep.stepkey;
        }
        else {
            convertedValue = fetchStep.name;
        }
    }

    return convertedValue;
}

export async function exportImage(elementId: string, fileName: string) {
    const element = document.getElementById(elementId)
    if (element) {
        let canvas = await html2canvas(element),
            data = canvas.toDataURL('image/jpg'),
            link = document.createElement('a');

        link.href = data;
        link.download = fileName + '.jpg';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function downloadJson(data: any, fileName: string, fileType: string) {
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}

export const exportToJson = (workFlowData: any, fileName: string) => {
    // e.preventDefault();
    downloadJson(
        JSON.stringify(workFlowData),
        fileName + '.json',
        'text/json',
    )
}

export const PublishedListDataLoader = async (params: any) => {
    try {
        let publishedWorkFlowDetails: any = {}
        if (configData.ENV == "LOC") {
            await fetch(configData.LOC.SPW_EMP_ENTRIES_PUBLISHED_LIST)
                .then(response => response.json())
                .then(data => { publishedWorkFlowDetails = data; })
        }
        else {
            await fetch(configData.DEV.SPW_ENTRIES_PUBLISHED)
                .then(response => response.json())
                .then(data => { publishedWorkFlowDetails = data; })
        }
        return publishedWorkFlowDetails
    } catch (e) {
        throw Error("Error could not load published workflows");
    }
}

export const SavedListDataLoader = async (params: any) => {
    try {
        let savedWorkFlowDetails: any = {}
        if (configData.ENV == "LOC") {
            await fetch(configData.LOC.SPW_EMP_ENTRIES_SAVED_LIST)
                .then(response => response.json())
                .then(data => { savedWorkFlowDetails = data; })
        }
        else {
            await fetch(configData.DEV.SPW_ENTRIES_SAVED + user.email)
                .then(response => response.json())
                .then(data => { savedWorkFlowDetails = data; })
        }
        return savedWorkFlowDetails
    } catch (e) {
        throw Error("Error could not load saved workflows");
    }
}

export const TemplateListDataLoader = async (params: any) => {
    try {
        let templateWorkFlowDetails: any = {}
        if (configData.ENV == "LOC") {
            await fetch(configData.LOC.SPW_EMP_ENTRIES_TEMPLATE_LIST)
                .then(response => response.json())
                .then(data => { templateWorkFlowDetails = data; })
        }
        else {
            await fetch(configData.DEV.SPW_ENTRIES_TEMPLATE)
                .then(response => response.json())
                .then(data => { templateWorkFlowDetails = data; })
        }
        return templateWorkFlowDetails
    } catch (e) {
        throw Error("Error could not load template workflows");
    }
}

export const AnnotationListDataLoader = async (params: any) => {
    try {
        let annotationWorkFlowDetails: any = {}
        if (configData.ENV == "LOC") {
            await fetch(configData.LOC.SPW_EMP_ENTRIES_SAVED_LIST)
                .then(response => response.json())
                .then(data => { annotationWorkFlowDetails = data; })
        }
        else {
            await fetch(configData.DEV.SPW_ENTRIES_ANNOTATION)
                .then(response => response.json())
                .then(data => { annotationWorkFlowDetails = data; })
        }
        return annotationWorkFlowDetails
    } catch (e) {
        throw Error("Error could not load saved workflows");
    }
}

export const EntriesToReleaseDataLoader = async (params: any) => {
    try {
        let annotationWorkFlowDetails: any = {}
        if (configData.ENV == "LOC") {
            await fetch(configData.LOC.SPW_EMP_ENTRIES_SAVED_LIST)
                .then(response => response.json())
                .then(data => { annotationWorkFlowDetails = data; })
        }
        else {
            await fetch(configData.DEV.SPW_ENTRIES_RELEASE)
                .then(response => response.json())
                .then(data => { annotationWorkFlowDetails = data; })
        }
        return annotationWorkFlowDetails
    } catch (e) {
        throw Error("Error could not load saved workflows");
    }
}

export const ApprovedListDataLoader = async (params: any) => {
    try {
        let annotationWorkFlowDetails: any = {}
        if (configData.ENV == "LOC") {
            await fetch(configData.LOC.SPW_EMP_ENTRIES_SAVED_LIST)
                .then(response => response.json())
                .then(data => { annotationWorkFlowDetails = data; })
        }
        else {
            await fetch(configData.DEV.SPW_ENTRIES_APPROVED + user.email)
                .then(response => response.json())
                .then(data => { annotationWorkFlowDetails = data; })
        }
        return annotationWorkFlowDetails
    } catch (e) {
        throw Error("Error could not load saved workflows");
    }
}


export const ViewWorkFlowDataLoader = async (params: any) => {
    try {
        let publishedWorkFlowDetails: any = {}
        if (configData.ENV == "LOC") {
            await fetch(configData.LOC.SPW_EMP_ENTRY + params.params.workflowtype + "/" + params.params.workflowid + "/")
                .then(response => response.json())
                .then(data => { publishedWorkFlowDetails = data; })
        }
        else {
            let fetchUrl:string  = "";
            if (params.params.workflowtype == "annotation"){
                fetchUrl = configData.DEV.SPW_ENTRY_ANNOTATION + "fetch/";
            }
            else if (params.params.workflowtype == "saved"){
                fetchUrl = configData.DEV.SPW_ENTRY_DEPOSITION + "fetch/";
            }
            else {
                fetchUrl = configData.DEV.SPW_ENTRY + params.params.workflowtype + "/";
            }
            await fetch(fetchUrl + params.params.workflowid + "/")
            .then(response => response.json())
            .then(data => { publishedWorkFlowDetails = data; }) 
        }
        return publishedWorkFlowDetails
    } catch (e) {
        throw Error("Error could not load  workflows");
    }
}

export const AnnotationWorkFLowDataLoader = async (params: any) => {
    let data:any = {}
    try {
        let annotatedWorkFlowDetails: any = {}
        await fetch(configData.DEV.SPW_ENTRY_ANNOTATION + "fetch/" + params.params.workflowid + "/")
        .then(response => response.json())
        .then(data => { annotatedWorkFlowDetails = data; }) 
        data['annotateddata'] = annotatedWorkFlowDetails

        let savedWorkFlowDetails: any = {}
        await fetch(configData.DEV.SPW_ENTRY_DEPOSITION + "fetch/" + params.params.workflowid.replace("ANNOTATION", "DRAFT") + "/")
        .then(response => response.json())
        .then(data => { savedWorkFlowDetails = data; })
        data['saveddata'] = savedWorkFlowDetails

        return data
    } catch (e) {
        throw Error("Error could not load  workflows");
    }
}

export const MetaDataLoader = async (params: any) => {
    try {
        let workFlowData: any = {}
        if (configData.ENV == "LOC") {
            await fetch(configData.LOC.SPW_EMP_ENTRY + params.params.workflowtype + "/" + params.params.workflowid + "/")
            .then(response => response.json())
            .then(data => { workFlowData = data; })
        }
        else {
            let fetchUrl:string  = "";
            if (params.params.workflowtype == "annotation"){
                fetchUrl = configData.DEV.SPW_ENTRY_ANNOTATION + "fetch/";
            }
            else if (params.params.workflowtype == "saved"){
                fetchUrl = configData.DEV.SPW_ENTRY_DEPOSITION + "fetch/";
            }
            else {
                fetchUrl = configData.DEV.SPW_ENTRY + params.params.workflowtype + "/";
            }
            await fetch(fetchUrl + params.params.workflowid)
            .then(response => response.json())
            .then(data => { workFlowData = data; })
        }
        return workFlowData;
    } catch (e) {
        throw Error("Error could not load entry ID:" + params.params.workflowid);
    }
}

export const submitData = async (workFlowData: any) => {
    let result: any = {}
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workFlowData)
    };
    if (configData.ENV == "LOC") {
        fetch( configData.LOC.SPW_EMP_ENTRY + 'published/', requestOptions)
        .then(response => response.json())
        .then(data => { result = data; return result });
    }
    else{
        fetch('http://127.0.0.1:8001/empiar/api/api/spw/entry/published/', requestOptions)
        .then(response => response.json())
        .then(data => { result = data; return result });
    }
}

export const saveData = async (workFlowData: any) => {
    let result: any = {}
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workFlowData)
    };
    if (configData.ENV == "LOC") {
        fetch(configData.LOC.SPW_EMP_ENTRY + 'saved/', requestOptions)
        .then(response => response.json())
        .then(data => { result = data; return result });
    }
    else{
        fetch('http://127.0.0.1:8001/empiar/api/api/spw/entry/published/', requestOptions)
        .then(response => response.json())
        .then(data => { result = data; return result });
    }
}

export const updateSaved = async (params: any) => {
    let result: any = {}
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params.params.workFlowData)
    };
    if (configData.ENV == "LOC") {
        fetch(configData.LOC.SPW_EMP_ENTRY + 'saved/' + params.params.workflowid, requestOptions)
        .then(response => response.json())
        .then(data => { result = data; return result });
    }
    else{
        fetch('http://127.0.0.1:8001/empiar/api/api/spw/entry/published/', requestOptions)
        .then(response => response.json())
        .then(data => { result = data; return result });
    }
}

export const check_worflowdata_changes = async (workFlowData:any) => {
    let resultObject:any = {}
    let isDataEqual = false
    if (workFlowData){
        let entryDetails = workFlowData.entryid.split("-")
        let entryTypePrefix = entryDetails[0]
        let entryId = entryDetails[1]
        let workFlowDataToCompare:any = {}
        let entryTypePrefixToCompare:string = ''
        if (entryTypePrefix == "ANNOTATION"){
            entryTypePrefixToCompare = "DRAFT"
        }
        else{
            entryTypePrefixToCompare = "ANNOTATION"
        }
        if (entryTypePrefixToCompare == "ANNOTATION")
            {
                await fetch(configData.DEV.SPW_ENTRY_ANNOTATION + "fetch/" + (entryTypePrefixToCompare + "-" + entryId ) + "/")
                .then(response => response.json())
                .then(data => { workFlowDataToCompare = data; })
            }
            else{
                await fetch(configData.DEV.SPW_ENTRY_DEPOSITION + "fetch/" + (entryTypePrefixToCompare + "-" + entryId ) + "/")
                    .then(response => response.json())
                    .then(data => { workFlowDataToCompare = data; })
            }
        isDataEqual = _.isEqual(workFlowData.data, workFlowDataToCompare.data)
        if (isDataEqual){
            resultObject =  {'isedited': false, 'comapreddata': workFlowDataToCompare}
        }
        else{
            resultObject =  {'isedited': true, 'comapreddata': workFlowDataToCompare}
        }
    }
    return resultObject;
}
