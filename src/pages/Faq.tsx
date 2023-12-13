import "../widget/Widget.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

function Faq() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>What is this?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              This is a prototype widget to facilitate the entry of specimen protocol information in the EMPIAR deposition system. We would like to test: a) how easy it is to use and what additional functionality is required to build protocols and b) if there are specimen preparation steps or information that we have missed or inadequately represented.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>What is this?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              This is a prototype widget to facilitate the entry of specimen protocol information in the EMPIAR deposition system. We would like to test: a) how easy it is to use and what additional functionality is required to build protocols and b) if there are specimen preparation steps or information that we have missed or inadequately represented.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>What do you want us to do with it?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ol>
              <li>
                Click on the Published Workflow Menu button on the left hand side to access all the SPW entrie that are public.
              </li>
              <li>
                Click on the Saved Workflow Menu button on the left hand side to access your SPW entris that are saved as drafts.
              </li>
              <li>
                Click on the Template Workflow Menu button on the left hand side to access the SPW entiries that can be used as a sample template to create a new one.
              </li>
              <li>
                Click on the Build A Workflow Menu button to start building a new Sample Preparation Workflow. Build section of the workflow consists of three sections:
                <ol type="i">
                  <li>
                    Meta data section which captures the Name, Imaging Method and the Biological Identity of the Sample
                  </li>
                  <li>
                    Work Flow section which lets your create the Sample Preparation Steps. You could click on any of the steps on the scrolling menu to get started.
                  </li>
                  <li>
                    Review section where you could go throught the created workflow and choose to make a) Edits b) Save the SPW entry as a draft c) Submit the SPW entr to EMPIAR. Submitting the enrtry will make the workflow data public and you will recive a DOI for the same.
                  </li>
                </ol>
              </li>
            </ol>
          </AccordionDetails>
        </Accordion >
      </Container>
    </>
  );
}

export default Faq;