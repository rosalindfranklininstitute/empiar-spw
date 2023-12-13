import { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import "../widget/Widget.css";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import WorkflowVisualisationCard from "../components/WorkFlowVisualisationCard";
import FetchLocalEntryData from "../schema/LocalDataFetcher";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from "@mui/material/Stack";
import { exportImage, exportToJson, saveWfData, submitWfData } from "../utils/WidgetUtility";


interface ViewWorkFlowType {
    workFlowDataToLoad?: any
}

function ViewWorkFlow(props: ViewWorkFlowType) {
    let entryData: any = useLoaderData();

    const [workFlowData, setWorkFlowData] = useState<any>(entryData)
    const navigate = useNavigate();

    if (props.workFlowDataToLoad) {
        setWorkFlowData(props.workFlowDataToLoad)
    }

    const downloadJson = () => {
        exportToJson(workFlowData, workFlowData.entryid);
    }

    const downloadImage = () => {
        exportImage('workflow-vis', workFlowData.entryid);
    }

    const saveData = () =>{
        saveWfData(workFlowData);
    }

    const submitData = () =>{
        submitWfData(workFlowData);
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                {Object.keys(workFlowData).length &&
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                <WorkflowVisualisationCard stepData={workFlowData}></WorkflowVisualisationCard>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack direction="column" spacing={2}>
                                <Button variant="contained" onClick={() => navigate(-1)}>Go back</Button>
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
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                }
            </Container>
        </>
    )
}


export default ViewWorkFlow;
