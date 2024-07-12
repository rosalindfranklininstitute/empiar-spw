// import data from "../static/sampledata/publishedjsons/p1.json"
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from "@mui/material/Stack";

import "../widget/Widget.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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



function AnnotationReviewWorkFlow() {
    const userContext = useContext(UserContext);
    const { state } = useLocation();
    const [openSuccess, setOpenSuccess] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [isSaveComplete, setisSaveComplete] = useState<boolean>(false)
    const workFlowData = state.data;
    const comparedData = state.saveddata;
    const navigate = useNavigate();

    let params = useParams();
    const userType = params.usertype;

    const downloadJson = () => {
        exportToJson(workFlowData, workFlowData.id);
    }

    const downloadImage = () => {
        exportImage('workflow-vis', workFlowData.entryid);
    }

    const closeAlertDialog = () => {
        setMessage("");
        setOpenSuccess(false);
    }

    const updateAnnotationReview = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': userContext.csrftoken
             },
            body: JSON.stringify(workFlowData)
        };
        if (configData.ENV == "LOC") {
            fetch(configData.LOC.SPW_EMP_ENTRY + 'annotation/update' + workFlowData["entryid"], requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                    setIsSuccess(true);
                    setMessage(data["entryid"] + " created succesfuly with DOI:" + data["message"]);
                    setOpenSuccess(true);
                    setisSaveComplete(true);
                }
                else{
                    setIsSuccess(false);
                    setMessage(data["entryid"] + "SPW submission failed with error message:" + data["message"]);
                    setOpenSuccess(true);
                    setisSaveComplete(false);
                }
            });
            setIsSuccess(true);
            setMessage("Test SPW entry saved as a draft succesfuly with DOI: TEST DOI");
            setOpenSuccess(true);
            setisSaveComplete(true);
        }
        else{
            fetch(configData.DEV.SPW_ENTRY_ANNOTATION + 'update/' + workFlowData["entryid"] + "/", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                    setIsSuccess(true);
                    setMessage(data["entryid"] + " updated succesfuly");
                    setOpenSuccess(true);
                    setisSaveComplete(true);
                }
                else{
                    setIsSuccess(false);
                    setMessage(data["entryid"] + "SPW submission failed with error message:" + data["message"]);
                    setOpenSuccess(true);
                    setisSaveComplete(false);
                }
            });
        }
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
            fetch(configData.LOC.SPW_EMP_ENTRY + 'requestapproval/' + workFlowData['entryid'], requestOptions)
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
        workFlowData.is_approved = 1
        alert('test');
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': userContext.csrftoken
             },
            body: JSON.stringify(workFlowData)
        };
        if (configData.ENV == "LOC") {
            fetch(configData.LOC.SPW_EMP_ENTRY + "approve/" + workFlowData['entryid'], requestOptions)
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
        fetch(configData.DEV.SPW_ENTRY_DEPOSITION + "approve/" + workFlowData['entryid'], requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                setMessage("Request for approval of entry: " + data["entryid"] + " created succesfuly");
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
        navigate("../workflow/annotation", { state: { metadata: workFlowData.metadata, entrydata: workFlowData } });
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="xl">
                <Stack direction='column' spacing={2}>
                <Collapse in={openSuccess}>
                { isSuccess == true ? 
                    <Alert severity="success" onClose={closeAlertDialog}>
                        <AlertTitle>Success</AlertTitle>
                        {message}
                    </Alert> :
                    <Alert severity="error" onClose={closeAlertDialog}>
                        <AlertTitle>Error</AlertTitle>
                        {message}
                    </Alert>
                }
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
                                                { userType == "annotator" &&
                                                     <Button variant="contained" onClick={updateAnnotationReview}>
                                                        Update
                                                    </Button>
                                                }
                                                { userType == "annotator" &&
                                                     <Button variant="contained" onClick={handleApprovalRequest} disabled={!isSaveComplete}>
                                                        Request Approval
                                                    </Button>
                                                }
                                                { userType == "depositor" &&
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


export default AnnotationReviewWorkFlow;
