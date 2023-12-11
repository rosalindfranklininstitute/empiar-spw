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
import BuildWorkFlow from "./BuildWorkFlow";

interface SamplePrepWidgetProps {
    jsonSchemaUrl?: string;
    submitUrl: string;
}

const MetaDataPaper = styled(Paper)(({ theme }) => ({
    width: '75%',
    height: '75%',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));
function LoadBuilder(props: SamplePrepWidgetProps) {
    const [workFlowData, setworkFlowData] = useState<any>({})
    const { workFlowType, workFlowId } = useParams();

    useEffect(() => {
        let isInitialLoad = true;
        async function fetchWidgetData(workFlowType:any, workFlowId: any) {
            // const module = await import('../static/sampledata/published.json');
            // if (isInitialLoad == true) {
            //     let widgetData = FetchLocalEntryData(workFlowType, workFlowId);
            //     isInitialLoad = false;
            //     setworkFlowData(widgetData);
            // }
            // if (workFlowType == "template"){
                fetch("http://127.0.0.1:8001/empiar/api/spw/entry/" + workFlowType + "/" + workFlowId + "/")
                .then(response => response.json())
                    // 4. Setting *dogImage* to the image url that we received from the response above
                .then(data => setworkFlowData(data))
            // }
        }
        async function fetchLocalWorkFlowData(workFlowType:any, workFlowId: any) {
            const workflowData = await import('../static/sampledata/' + workFlowType + 'jsons/' + workFlowId + '.json');
            if (isInitialLoad == true) {
                isInitialLoad = false;
                setworkFlowData(workflowData.default);
            }
        }
        if (workFlowId && isInitialLoad) {
            if (process.env.NODE_ENV == "development") {
                fetchLocalWorkFlowData(workFlowType, workFlowId);
            }
            else {
                fetchWidgetData(workFlowType, workFlowId);
            }
        }

        return () => {
            isInitialLoad = false;
        };
    }, [workFlowType, workFlowId]);

    if (props.jsonSchemaUrl) {
        return (
            <>
                <Toolbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <CssBaseline />
                    {Object.keys(workFlowData).length != 0 ? (
                        <BuildWorkFlow metaData={workFlowData.metadata} workFlowData={workFlowData.data} jsonSchemaUrl="test" submitUrl="test" />
                    ) :
                        (
                            <div> Could load the workflow </div>
                        )}
                </Box>
            </>
        );
    } else {
        return <h1>Load from URL</h1>;
    }
}

export default LoadBuilder;
