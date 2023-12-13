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
import { exportImage, exportToJson, saveWfData, submitWfData } from '../utils/WidgetUtility';
import { Collapse } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from 'react';
import configData from "../static/config.json";



function ReviewWorkFlow() {
    const { state } = useLocation();
    const [openSuccess, setOpenSuccess] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const workFlowData = state.data;
    const navigate = useNavigate();

    const downloadJson = () => {
        exportToJson(workFlowData, workFlowData.id);
    }

    const downloadImage = () => {
        exportImage('workflow-vis', workFlowData.entryid);
    }

    const saveData = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(workFlowData)
        };
        if (configData.ENV == "LOC") {
            setMessage("Test SPW entry saved as a draft succesfuly with DOI: TEST DOI");
            setOpenSuccess(!openSuccess);
        }
        else{
        fetch('http://127.0.0.1:8001/empiar/api/api/spw/entry/saved/', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                setMessage(data["spwid"] + " created succesfuly");
                setOpenSuccess(!openSuccess);
                }
                else{
                    setMessage(data["spwid"] + "SPW submission failed with error message:" + data["message"]);
                    setOpenSuccess(!openSuccess);
                }
            });
        }
    }

    const submitWfData = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(workFlowData)
        };
        if (configData.ENV == "LOC") {
            setMessage("Test SPW entry created succesfuly with DOI: TEST DOI");
            setOpenSuccess(!openSuccess);
        }
        else{
        fetch(configData.DEV.SPW_ENTRY + 'published/', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data["code"] == 1){
                setMessage(data["spwid"] + " created succesfuly with DOI:" + data["message"]);
                setOpenSuccess(!openSuccess);
                }
                else{
                    setMessage(data["spwid"] + "SPW submission failed with error message:" + data["message"]);
                    setOpenSuccess(!openSuccess);
                }
            });
        }
    }

    function navigateBack() {
        navigate("../workflow", { state: { metadata: workFlowData.metadata, data: workFlowData.data } });
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Stack direction='column' spacing={2}>
                <Collapse in={openSuccess}>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {message}
                    </Alert>
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
                                                <Button variant="contained" onClick={saveData}>
                                                    Save Workflow
                                                </Button>
                                                <Button variant="contained" onClick={submitWfData}>
                                                    Submit Workflow
                                                </Button>
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
