import { ListItemReferenceProps } from '../utils/WidgetDataUtility';

export async function fetchBio() {
    let arr: Array<ListItemReferenceProps> = [];
    return new Promise(resolve => {
        arr.push({
            id: "cf0",
            orderNumber: 1,
            stepTitle: "Chemical Fixation",
            stepKey: "cf",
        });
        resolve(arr);
    })
}

export async function LoadWidgetReferenceList(widgetData: any): Promise<any> {
    let correctedListReference: Array<ListItemReferenceProps> = [];
    if ("data" in widgetData) {
        widgetData["data"].map((workflowStepData: any, index: number) => {

            if (
                "method" in workflowStepData &&
                "orderNumber" in workflowStepData
            ) {
                const stepKey: string = stepKeyToTitleConverter(workflowStepData["method"]);
                if (stepKey !== "") {

                    let correctedListReferenceItem: ListItemReferenceProps = {
                        id: stepKey + workflowStepData["orderNumber"],
                        stepKey: stepKey,
                        stepTitle: workflowStepData["method"],
                        orderNumber: workflowStepData["orderNumber"],
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