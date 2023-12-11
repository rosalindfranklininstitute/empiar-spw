// import data from "../static/sampledata/publishedjsons/p1.json"
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from "@mui/material/Stack";

import "../widget/Widget.css";
import { useLocation, useParams } from "react-router-dom";
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
import html2canvas from 'html2canvas';



function ReviewWorkFlow() {
    const { state } = useLocation();
    const workFlowData = state.data;

    async function downloadImage() {
        const element = document.getElementById('workflow-vis')
        if (element) {
            let canvas = await html2canvas(element),
                data = canvas.toDataURL('image/jpg'),
                link = document.createElement('a');

            link.href = data;
            link.download = 'downloaded-image.jpg';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    function downloadJson(data: any, fileName: string, fileType: string) {
        const blob = new Blob([data], { type: fileType })
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    const exportToJson = () => {
        // e.preventDefault();
        downloadJson(
            JSON.stringify(workFlowData),
            'users.json',
            'text/json',
        )
    }

    function saveWorkFlow() {

    }

    function submitWorkFlow() {

    }
    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                {Object.keys(workFlowData).length &&
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <WorkflowVisualisationCard stepData={workFlowData}></WorkflowVisualisationCard>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack direction="column" spacing={2}>
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
                                                <Button variant="contained" onClick={exportToJson}>
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
                                                <Button variant="contained" onClick={() => saveWorkFlow}>
                                                    Save Workflow
                                                </Button>
                                                <Button variant="contained" onClick={() => submitWorkFlow}>
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
            </Container>
        </>
    )
}


export default ReviewWorkFlow;
