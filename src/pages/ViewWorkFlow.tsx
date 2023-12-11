import { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import "../widget/Widget.css";
import { useParams } from "react-router-dom";
import WorkflowVisualisationCard from "../components/WorkFlowVisualisationCard";
import FetchLocalEntryData from "../schema/LocalDataFetcher";

interface ViewWorkFlowType{
    workFlowDataToLoad?:any
}

function ViewWorkFlow(props:ViewWorkFlowType) {
    const [workFlowData, setWorkFlowData] = useState<any>({})
    const { workFlowType, workFlowId } = useParams();

    if(props.workFlowDataToLoad){
        setWorkFlowData(props.workFlowDataToLoad)
    }

    useEffect(() => {
        let isInitialLoad = true;
        const fetchWorkFlowData = async (workFlowType:any, workFlowId:any) => {
            fetch("http://127.0.0.1:8001/empiar/api/spw/entry/" + workFlowType + "/" + workFlowId + "/")
            .then(response => response.json())
                // 4. Setting *dogImage* to the image url that we received from the response above
            .then(data => setWorkFlowData(data))
        }

        const fetchLocalWorkFlowData = async (workFlowType:any, workFlowId:any) => {
            const workflowData = await import('../static/sampledata/' + workFlowType + 'jsons/' + workFlowId + '.json');
            if (isInitialLoad == true) {
                isInitialLoad = false;
                setWorkFlowData(workflowData.default);
            }
        }
        if (isInitialLoad) {
            if (process.env.NODE_ENV == "development") {
                fetchLocalWorkFlowData(workFlowType, workFlowId)
            }
            else {
                fetchWorkFlowData(workFlowType, workFlowId);
            }
        }
        return () => {
            isInitialLoad = false;
        };
    }, [workFlowType, workFlowId]);

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm">
                {Object.keys(workFlowData).length &&
                    <WorkflowVisualisationCard stepData={workFlowData}></WorkflowVisualisationCard>
                }
            </Container>
        </>
    )
}


export default ViewWorkFlow;
