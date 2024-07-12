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
import { exportImage, exportToJson, check_worflowdata_changes } from '../utils/WidgetUtility';
import { Collapse } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from 'react';
import configData from "../static/config.json";
import { UserContext } from '../utils/UserContext';
import { useContext } from 'react';
const _ = require('lodash');



function ReviewWorkFlow() {
    const userContext = useContext(UserContext);
    const { state } = useLocation();
    const [openSuccess, setOpenSuccess] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [isSaveComplete, setisSaveComplete] = useState<boolean>(false)
    const workFlowData = state.data;
    const navigate = useNavigate();

    let params = useParams();
    const workFlowType = params.workflowtype;

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

    const saveData = () => {
        if ('_id' in workFlowData)
        {
          delete workFlowData._id;
        }
        workFlowData.is_curated = 0;
        const requestOptions = {
            method: 'POST',
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
                    setIsSuccess(true);
                    setMessage(data["entryid"] + " created succesfuly. Saved entry can be accessed at:" + data["savedurl"]);
                    setOpenSuccess(true);
                    setisSaveComplete(true);
                    if(workFlowType == "new"){
                        workFlowData["entryid"] = data["entryid"]
                    }
                }
                else{
                    setisSaveComplete(false);
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
        fetch(configData.DEV.SPW_ENTRY_DEPOSITION + 'save/', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                    setIsSuccess(true);
                    setMessage(data["entryid"] + " created succesfuly");
                    setOpenSuccess(true);
                    setisSaveComplete(true);
                    if(workFlowType == "new"){
                        workFlowData["entryid"] = data["entryid"]
                    }
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
  
    const updateData = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': userContext.csrftoken
             },
            body: JSON.stringify(workFlowData)
        };
        if (configData.ENV == "LOC") {
            fetch(configData.LOC.SPW_EMP_ENTRY + 'saved/' + workFlowData["entryid"], requestOptions)
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
            setIsSuccess(true);
            setMessage("Test SPW entry saved as a draft succesfuly with DOI: TEST DOI");
            setOpenSuccess(true);
            setisSaveComplete(true);
        }
        else{
            fetch(configData.DEV.SPW_ENTRY_DEPOSITION + 'update/' + workFlowData["entryid"] + "/", requestOptions)
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

    const handleSubmitData = async () => {
        if ('_id' in workFlowData)
        {
            delete workFlowData._id;
        }
        workFlowData.is_curated = 0
        workFlowData.is_approved = 0
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': userContext.csrftoken
             },
            body: JSON.stringify(workFlowData)
        };
        if (configData.ENV == "LOC") {
            fetch(configData.LOC.SPW_EMP_ENTRY + 'submit', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                    setIsSuccess(true);
                    setMessage(data["entryid"] + " created succesfuly for the annotation of the entry " + data["entryid"].replace("ANNOTATION", "DRAFT"));
                    setOpenSuccess(true);
                }
                else{
                    setIsSuccess(false);
                    setMessage(data["entryid"] + "SPW submission failed with error message:" + data["message"]);
                    setOpenSuccess(true);
                }
            });
            setIsSuccess(true);
            setMessage("Test SPW entry created succesfuly with DOI: TEST DOI");
            setOpenSuccess(true);
        }
        else{
            fetch(configData.DEV.SPW_ENTRY_DEPOSITION + "submit/" , requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                    setIsSuccess(true);
                    setMessage(data["entryid"] + " created succesfuly for the annotation of the entry " + data["entryid"].replace("ANNOTATION", "DRAFT"));
                    setOpenSuccess(true);
                }
                else{
                    setIsSuccess(false);
                    setMessage(data["entryid"] + "SPW submission failed with error message:" + data["message"]);
                    setOpenSuccess(true);
                }
            });
        }
    }

    const handlePublishData = async () => {
        if ('_id' in workFlowData)
        {
            delete workFlowData._id;
        }
        delete workFlowData.is_curated
        delete workFlowData.is_approved
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': userContext.csrftoken
             },
            body: JSON.stringify(workFlowData)
        };
        if (configData.ENV == "LOC") {
            fetch(configData.LOC.SPW_EMP_ENTRY + 'published/', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                setIsSuccess(true);
                setMessage(data["entryid"] + " created succesfuly with DOI:" + data["doi"]);
                setOpenSuccess(true);
                }
                else{
                    setIsSuccess(false);
                    setMessage(data["entryid"] + "SPW submission failed with error message:" + data["message"]);
                    setOpenSuccess(true);
                }
            });
            setIsSuccess(true);
            setMessage("Test SPW entry created succesfuly with DOI: TEST DOI");
            setOpenSuccess(true);
        }
        else{
            fetch(configData.DEV.SPW_ENTRY_ANNOTATION + "publish" , requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                    setIsSuccess(true);
                    setMessage(data["entryid"] + " published succesfuly with DOI: " + data["doi"]);
                    setOpenSuccess(true);
                }
                else{
                    setIsSuccess(false);
                    setMessage(data["entryid"] + "SPW submission failed with error message:" + data["message"]);
                    setOpenSuccess(true);
                }
            });
        }
    }

    function navigateBack() {
        navigate("../workflow/" + workFlowType, { state: { metadata: workFlowData.metadata, entrydata: workFlowData, isNavLink: true } });
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
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
                {Object.keys(workFlowData).length &&
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <WorkflowVisualisationCard stepData={workFlowData}></WorkflowVisualisationCard>
                            </Grid>
                            <Grid item xs={4}>
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
                                                { workFlowType == "saved" &&
                                                    <Button variant="contained" onClick={updateData}>
                                                        Update Workflow
                                                    </Button>
                                                }
                                                { (workFlowType == "new" || workFlowType == "template") &&
                                                    <Button variant="contained" onClick={saveData}>
                                                        Save Workflow
                                                    </Button>
                                                }
                                                { (workFlowType == "new" ||  workFlowType == "saved") &&
                                                    <Button variant="contained" onClick={handleSubmitData} disabled={!isSaveComplete}>
                                                            Submit Workflow
                                                    </Button>
                                                }
                                                { workFlowType == "annotation" &&
                                                     <Button variant="contained" onClick={handlePublishData}>
                                                        Publish Workflow
                                                    </Button>
                                                }
                                            </Stack>
                                        </AccordionDetails>
                                    </Accordion>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                }
                </Stack>
            </Container>
        </>
    )
}


export default ReviewWorkFlow;
