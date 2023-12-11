import MenuScroller from "../components/MenuScroller";
import { useEffect, useState } from "react";
import { SortableList } from "../components";
import WorkFlowBuilderPh from "../static/components/WorkFlowBuilderPh";
import { ListItemReferenceProps } from '../utils/WidgetDataUtility';
import { LoadWidgetReferenceList } from '../utils/WidgetUtility';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


import "../widget/Widget.css";
import { useLocation, useNavigate } from "react-router-dom";

interface SamplePrepWidgetProps {
    workFlowData?: any;
    metaData?: any;
}

const MetaDataPaper = styled(Paper)(({ theme }) => ({
    width: '75%',
    height: '75%',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

let formData: any = {}

// export const WorkFlowDataLoader = async (params: any) => {
//     const workFlowDataToLoad = await import('../static/sampledata/' + params.params.workflowtype + 'jsons/' + params.params.workflowid + '.json')
//     // let correctedListReference = await LoadWidgetReferenceList();
//     return workFlowDataToLoad.data;
// }

function WorkFlowSteps(props: SamplePrepWidgetProps) {
    const [listReference, setListReference] = useState<ListItemReferenceProps[]>([]);
    const { state } = useLocation();
    let workFlowStepsData: any = state.data;
    formData['metadata'] = state.metadata;
    const navigate = useNavigate();

    useEffect(() => {
        let isInitialLoad = true;
        async function fetchWidgetData(workFlowStepsData: any) {
            if (isInitialLoad == true) {
                if (workFlowStepsData.length > 0 && isInitialLoad) {
                    let correctedListReference: Array<ListItemReferenceProps> = [];
                    correctedListReference = await LoadWidgetReferenceList(workFlowStepsData);
                    correctedListReference.map((data: any) => {
                        formData[data.id] = data.stepData;
                    });
                    if (correctedListReference.length > 0) {
                        isInitialLoad = false;
                        console.log(correctedListReference);
                        setListReference(correctedListReference);
                    }
                    else {
                        isInitialLoad = false;
                    }
                }
            }
        }
        fetchWidgetData(workFlowStepsData);

        return () => {
            isInitialLoad = false;
        };
    }, []);


    function handleAddMenuClick(stepKey: string, stepTitle: string, stepData?: any) {
        let listReferenceLength = 0;
        if (listReference) {
            listReferenceLength = listReference.length;
        }
        let listReferenceItem = {
            id: stepKey + listReferenceLength,
            orderNumber: listReferenceLength + 1,
            stepKey: stepKey,
            stepTitle: stepTitle,
            stepData: stepData
        };
        const correctedListReference = listReference.slice();
        correctedListReference.push(listReferenceItem);
        setListReference(correctedListReference);
    }

    function handleRemoveClick(stepId: string | number) {
        let correctedListReference = listReference.slice();
        correctedListReference.map((listItem, index) => {
            if (listItem.id == stepId) {
                correctedListReference.splice(index, 1)
            }
        });
        correctedListReference.map((listItem, index) => {
            listItem.orderNumber = index + 1;
        });
        delete formData[stepId];
        setListReference(correctedListReference);
    }

    function handleUpdateWidgetData(stepId: string | number, stepData: any) {
        formData[stepId] = stepData;
    }

    function submitWorkFlow() {
        let workFlowCollectedData: any = {};
        let reorgWorkFlowData: any[] = [];

        workFlowCollectedData["data"] = reorgWorkFlowData;
        workFlowCollectedData["metadata"] = props.metaData;
        for (const key in formData) {
            if (key === "metadata") {
                workFlowCollectedData["metadata"] = formData["metadata"];
            }
            else {
                reorgWorkFlowData.push(formData[key]);
            }
        }
        navigate("../review/", {state : {data: workFlowCollectedData}});
        // setFormData(newFormData);
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(workFlowCollectedData)
        // };

        // fetch("http://127.0.0.1:8001/empiar/api/spw/entry/published/", requestOptions)
        // .then(response => response.json())
        //     // 4. Setting *dogImage* to the image url that we received from the response above
        // .then(data => console.log(data))


    }

    function fetchWorkFlowTitle() {
        let name = "";
        if ("name" in state.metadata) {
            name = state.metadata.name;
        }
        return name;
    }


    return (
        <>
            <div>
                <MetaDataPaper square>
                    <Typography variant="h6" align="left" sx={{ my: 2 }}>
                        {fetchWorkFlowTitle()}
                    </Typography>
                    <Divider />
                    <MenuScroller onMenuClick={handleAddMenuClick}></MenuScroller>

                    {listReference && listReference.length >= 1 ? (
                        <SortableList
                            items={listReference}
                            onChange={setListReference}
                            renderItem={(item) => (
                                <SortableList.Item
                                    id={item.id}
                                    stepKey={item.stepKey}
                                    stepTitle={item.stepTitle}
                                    orderNumber={item.orderNumber}
                                    onRemove={handleRemoveClick}
                                    stepData={item.stepData}
                                    onCopyStep={handleAddMenuClick}
                                    onUpdateWidgetData={handleUpdateWidgetData}
                                >
                                    {item.id}
                                    {/* <SortableList.DragHandle /> */}
                                </SortableList.Item>
                            )}
                        />
                    ) : (
                        <WorkFlowBuilderPh></WorkFlowBuilderPh>
                    )}
                    <div className="row">
                        <button onClick={submitWorkFlow}>Submit</button>
                    </div>
                </MetaDataPaper>
            </div>
        </>
    );
}

export default WorkFlowSteps;
