// import data from "../static/sampledata/publishedjsons/p1.json"
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from "@mui/material/Stack";

import "../widget/Widget.css";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import WorkflowVisualisationCard from "../components/WorkFlowVisualisationCard";
import FetchLocalEntryData from "../schema/LocalDataFetcher";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { exportImage, exportToJson } from '../utils/WidgetUtility';
import { Collapse } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from 'react';
import configData from "../static/config.json";
import ReactDiffViewer from 'react-diff-viewer';
import { UserContext } from '../utils/UserContext';
import { useContext } from 'react';
import { LoadWidgetReferenceList, check_worflowdata_changes } from '../utils/WidgetUtility';



function ApproveReviewWorkFlow() {
    const userContext = useContext(UserContext);
    let data: any = useLoaderData();
    let entryData: any = data['annotateddata']
    let comparedData: any = data['saveddata']


    const [workFlowData, setWorkFlowData] = useState<any>(entryData)

    const navigate = useNavigate();
    const [message, setMessage] = useState<string>("")
    const [openSuccess, setOpenSuccess] = useState<boolean>(false)
    const [requestForChange, setRequestForChange] = useState<boolean>(false)



    let params = useParams();
    const workFlowType = params.workflowtype;

    const downloadJson = () => {
        exportToJson(workFlowData, workFlowData.id);
    }

    const downloadImage = () => {
        exportImage('workflow-vis', workFlowData.entryid);
    }

    
    const handleApprovalRequest = () => {
        workFlowData.is_curated = 1
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': userContext.csrftoken
             },
            body: JSON.stringify(workFlowData)
        };
        if (configData.ENV == "LOC") {
            fetch(configData.LOC.SPW_EMP_ENTRY + 'saved/', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                setMessage(data["entryid"] + " created succesfuly. Saved entry can be accessed at:" + data["savedurl"]);
                setOpenSuccess(!openSuccess);
                }
                else{
                    setMessage(data["entryid"] + "SPW submission failed with error message:" + data["message"]);
                    setOpenSuccess(!openSuccess);
                }
            });
            setMessage("Test SPW entry saved as a draft succesfuly with DOI: TEST DOI");
            setOpenSuccess(!openSuccess);
        }
        else{
        fetch(configData.DEV.SPW_ENTRY_ANNOTATION + "requestapproval/" + workFlowData['entryid'] + "/", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                setMessage("Request for approval of entry: " + workFlowData["entryid"] + " created succesfuly");
                setOpenSuccess(!openSuccess);
                }
                else{
                    setMessage("Request for approval of entry: " + data["entryid"] + " failed with error message:" + data["message"]);
                    setOpenSuccess(!openSuccess);
                }
            });
        }
    }

    const handleApproval = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': userContext.csrftoken
             },
            body: JSON.stringify(workFlowData)
        };
        if (configData.ENV == "LOC") {
            fetch(configData.LOC.SPW_EMP_ENTRY + 'saved/', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                setMessage(data["entryid"] + " created succesfuly. Saved entry can be accessed at:" + data["savedurl"]);
                setOpenSuccess(!openSuccess);
                }
                else{
                    setMessage(data["entryid"] + "SPW submission failed with error message:" + data["message"]);
                    setOpenSuccess(!openSuccess);
                }
            });
            setMessage("Test SPW entry saved as a draft succesfuly with DOI: TEST DOI");
            setOpenSuccess(!openSuccess);
        }
        else{
        fetch(configData.DEV.SPW_ENTRY_DEPOSITION + "approve/" + workFlowData['entryid'] + "/", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                setMessage("Annotation changes for the entry: " + data["entryid"] + " has been approved for release succesfuly");
                setOpenSuccess(!openSuccess);
                }
                else{
                    setMessage("Request for approval of entry: " + data["entryid"] + " failed with error message:" + data["message"]);
                    setOpenSuccess(!openSuccess);
                }
            });
        }
    }


    function navigateBack() {
        navigate("../workflow/" + workFlowType, { state: { metadata: workFlowData.metadata, entrydata: workFlowData } });
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="xl">
                <Stack direction='column' spacing={2}>
                <Collapse in={openSuccess}>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {message}
                    </Alert>
                </Collapse>
                <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                <ReactDiffViewer
                                oldValue={JSON.stringify(comparedData.data, null, 2)} 
                                newValue={JSON.stringify(workFlowData.data, null, 2)} 
                                splitView={true}
                                leftTitle={workFlowData['entryid'].replace("ANNOTATION", "DRAFT")}
                                rightTitle={workFlowData['entryid']} />
                            </Grid>
                            <Grid item xs={3}>
                                <Stack direction="column" spacing={2}>
                                    <Button variant="contained" onClick={navigateBack}>Go back</Button>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Export Options:</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Stack direction="column" spacing={2}>
                                                <Button variant="contained" onClick={downloadImage}>
                                                    Download Image
                                                </Button>
                                                <Button variant="contained" onClick={downloadJson}>
                                                    Download JSON
                                                </Button>
                                            </Stack>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Workflow Actions:</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Stack direction="column" spacing={2}>
                                                { workFlowType == "annotator" &&
                                                     <Button variant="contained" onClick={handleApprovalRequest}>
                                                        Request Approval
                                                    </Button>
                                                }
                                                { workFlowType == "depositor" &&
                                                     <Button variant="contained" onClick={handleApproval}>
                                                        Approve For Release
                                                    </Button>
                                                }
                                            </Stack>
                                        </AccordionDetails>
                                    </Accordion>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}


export default ApproveReviewWorkFlow;
