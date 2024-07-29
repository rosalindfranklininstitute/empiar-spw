import MenuScroller from "../components/MenuScroller";
import { useContext, useEffect, useState } from "react";
import { SortableList } from "../components";
import WorkFlowBuilderPh from "../static/components/WorkFlowBuilderPh";
import { ListItemReferenceProps } from '../utils/WidgetDataUtility';
import { LoadWidgetReferenceList, check_worflowdata_changes } from '../utils/WidgetUtility';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import "../widget/Widget.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BasicCardHeader from "../components/BasicCardHeader";
import Button from '@mui/material/Button';
import { metaDataObject } from "../schema/WorkFlowStepSchemas";
import configData from "../static/config.json";
import { UserContext } from "../utils/UserContext";

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
    const user = useContext(UserContext);
    formData['metadata'] = state.metadata;
    let workFlowStepsData: any = {};
    let isNavLink = false
    if (state.entrydata !== undefined){
        workFlowStepsData =  state.entrydata.data;
    }
    if (state.isNavLink !== undefined){
        isNavLink =  state.isNavLink;
    }
    
    const navigate = useNavigate();

    let params = useParams();
    const workFlowType = params.workflowtype;

    useEffect(() => {
        let isInitialLoad = true;
        async function fetchWidgetData(workFlowStepsData: any) {
            if (isInitialLoad == true) {
                if (workFlowStepsData.length > 0 && isInitialLoad) {
                    let correctedListReference: Array<ListItemReferenceProps> = [];
                    correctedListReference = await LoadWidgetReferenceList(workFlowStepsData);
                    if (!formData.data && !isNavLink){
                        correctedListReference.map((data: any) => {
                            formData[data.id] = data.stepData;
                        });
                    }
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

    async function submitWorkFlow() {
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
        if (workFlowType == "new" || workFlowType == "template"){
            workFlowCollectedData["user"] = {
                "name": user.name,
                "email": user.email
            }
        }
        else{
            workFlowCollectedData["user"] = state.entrydata["user"];
            workFlowCollectedData["_id"] = state.entrydata["_id"];
            workFlowCollectedData["entryid"] = state.entrydata["entryid"];
        }
        if(workFlowType == "annotation"){
            const isDataEdited = await check_worflowdata_changes(workFlowCollectedData)
            if (isDataEdited['isedited']){
                navigate("../requestapproval/annotator", { state: { data: workFlowCollectedData, saveddata: isDataEdited['comapreddata']} });
            }
            else {
                navigate("../review/" + workFlowType, { state: { data: workFlowCollectedData } });
            }
        }
        else{
            navigate("../review/" + workFlowType, { state: { data: workFlowCollectedData } });
        }
        
    }

    function fetchWorkFlowTitle() {
        let name = "";
        if ("name" in state.metadata) {
            name = state.metadata.name;
        }
        return name;
    }
    
    function navigateBack() {
        navigate("../metadata/" + workFlowType, { state: { metadata: state.metadata, entrydata: state.entrydata, isNavLink: isNavLink } });
    }


    return (
        <>
            <div>
            <Button variant="contained" onClick={navigateBack}>Go back</Button>
            </div>
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
                        <Button variant="contained" onClick={submitWorkFlow}>Review Protocol</Button>
                    </div>
                </MetaDataPaper>
            </div>
        </>
    );
}

export default WorkFlowSteps;
