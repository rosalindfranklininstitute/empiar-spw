import HomeTiles from "../components/HomeTiles";
import WorkflowVisualisationCard from "../components/WorkFlowVisualisationCard";
import "../widget/Widget.css";
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';



function Home() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Stack direction="column" spacing={2}>
          <h2>Sample Preparation Widget (SPW)</h2>
          <Typography>Sample Preparation Widget (SPW) is an online tool available through the EMPIAR deposition system. SPW is an easy-to-use and re-usable web component that allows for the detailed and structured description of Sample Preparation (SP) protocols used for volume EM (vEM) experiments. The widget (working with a Mongo database) provides a repository of SP data that can be shared with other users and used for further analysis.</Typography>
          <Stack direction="row" spacing={5} sx={{padding: "0px 20px"}}>
            <HomeTiles
              title="Published Entries"
              descritpion="Entries that are submitted and made public."
              route="published"
              entrycount={4}></HomeTiles>
            <HomeTiles
              title="Template Entries"
              descritpion="Template entries from which users can create a new workflow"
              route="template"
              entrycount={4}></HomeTiles>
          </Stack>
          <Stack direction="row" spacing={5} sx={{padding: "0px 20px"}}>
            <HomeTiles
              title="Saved Entries"
              descritpion="Saved workflows "
              route="saved"
              entrycount={4}></HomeTiles>
            <HomeTiles
              title="Build A Workflow"
              descritpion="Create a new workflow"
              route="build/metadata/new"
              entrycount={4}></HomeTiles>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default Home;