import workflowForm from "../static/workFlowForm.json";
import MenuScroller from "../components/MenuScroller";
import { useCallback, useEffect, useState } from "react";
import { SortableList } from "../components";
import WorkFlowBuilderPh from "../static/components/WorkFlowBuilderPh";
import { ListItemReferenceProps } from '../utils/WidgetDataUtility';
import { LoadWidgetReferenceList } from '../utils/WidgetUtility';
import WorkFlowMetaData from "../components/MetaDataCard";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BuilderSteps from "../components/BuilderSteps";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';


import "../widget/Widget.css";
import { useParams } from "react-router-dom";
import ViewWorkFlow from "./ViewWorkFlow";
import FetchLocalEntryData from "../schema/LocalDataFetcher";
import ReviewWorkFlow from "./ReviewWorkFlow";

interface SamplePrepWidgetProps {
    jsonSchemaUrl?: string;
    submitUrl: string;
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

function BuildWorkFlow(props: SamplePrepWidgetProps) {
    let metaDataToLoad: any = {};
    if (props.metaData) {
        metaDataToLoad = props.metaData;
    }
    console.log("I am here");
    const [metaData, setMetaData] = useState<any>(metaDataToLoad)
    // const [formData, setFormData] = useState<any>()
    const [listReference, setListReference] = useState<ListItemReferenceProps[]>([]);
    const [toggleValue, setToggleValue] = useState<number>(0);
    const memoizedUpdateMetaData = useCallback(handleUpdateMetaData, [props.metaData]);

    useEffect(() => {
        let isInitialLoad = true;
        async function fetchWidgetData(workFlowData: string) {
            if (isInitialLoad == true) {
                if (workFlowData && isInitialLoad) {
                    let correctedListReference: Array<ListItemReferenceProps> = [];
                    correctedListReference = await LoadWidgetReferenceList(workFlowData);
                    correctedListReference.map((data: any) => {
                        formData[data.id] = data.stepData;
                    });
                    if (correctedListReference.length > 0) {
                        isInitialLoad = false;
                        console.log(correctedListReference);
                        // setMetaData(metaData)
                        setListReference(correctedListReference);
                    }
                    else{
                        isInitialLoad = false;
                    }
                }
            }
        }
        fetchWidgetData(props.workFlowData);

        return () => {
            isInitialLoad = false;
        };
    }, [props.workFlowData]);


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

    function handleUpdateMetaData(collectedMetaData: any) {
        setMetaData(collectedMetaData);
    }

    function handleBreadCrumbClick(selectedKey: number) {
        setToggleValue(selectedKey)
    }

    function submitWorkFlow() {
        let workFlowCollectedData: any = {};
        let reorgWorkFlowData: any[] = [];

        workFlowCollectedData["data"] = reorgWorkFlowData;
        workFlowCollectedData["metadata"] = metaData;
        for (const key in formData) {
            if (key === "metadata") {
                workFlowCollectedData["metadata"] = formData["metadata"];
            }
            else {
                reorgWorkFlowData.push(formData[key]);
            }
        }
        console.log("Submitted Data:");
        console.log(workFlowCollectedData);
        let newFormData = {}
        newFormData = workFlowCollectedData;
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
        if ("name" in metaData){
            name = metaData.name;
        }
        return name;
    }

    if (props.jsonSchemaUrl) {
        const title = workflowForm.title;
        
        return (
            <>
                <Toolbar />   <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                    {/* <ButtonAppBar></ButtonAppBar> */}
                    <CssBaseline />
                    <Container fixed>
                        <BuilderSteps onSelectionChange={handleBreadCrumbClick}></BuilderSteps>
                        <div>
                            <div id="metadatacontainer" hidden={!(toggleValue == 0)}>
                                <MetaDataPaper square>
                                    <WorkFlowMetaData id="1" data={metaData} updateMetaData={memoizedUpdateMetaData}></WorkFlowMetaData>
                                </MetaDataPaper>
                            </div>
                            <div id="stepscontainer" hidden={!(toggleValue == 1)}>
                                <MetaDataPaper square>
                                    <Typography variant="h6" sx={{ my: 2 }}>
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
                            <div id="reviewcontainer" hidden={!(toggleValue == 2)}>
                                {/* <ReviewWorkFlow workFlowDataToLoad={formData}></ReviewWorkFlow> */}
                            </div>
                        </div>
                    </Container>
                </Box>
            </>
        );
    } else {
        return <h1>Load from URL</h1>;
    }
}

export default BuildWorkFlow;
