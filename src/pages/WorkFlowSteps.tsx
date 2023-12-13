import MenuScroller from "../components/MenuScroller";
import { useEffect, useState } from "react";
import { SortableList } from "../components";
import WorkFlowBuilderPh from "../static/components/WorkFlowBuilderPh";
import { ListItemReferenceProps } from '../utils/WidgetDataUtility';
import { LoadWidgetReferenceList } from '../utils/WidgetUtility';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import "../widget/Widget.css";
import { useLocation, useNavigate } from "react-router-dom";
import BasicCardHeader from "../components/BasicCardHeader";

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
    }, [workFlowStepsData]);

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
        navigate("../review/", { state: { data: workFlowCollectedData } });
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
                <BasicCardHeader title={fetchWorkFlowTitle()} width="75%" />
                <MetaDataPaper square>
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
