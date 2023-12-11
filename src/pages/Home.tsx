import HomeTiles from "../components/HomeTiles";
import WorkflowVisualisationCard from "../components/WorkFlowVisualisationCard";
import "../widget/Widget.css";
import Stack from '@mui/material/Stack';



function Home() {
  return (
    <>
      <Stack direction="row" spacing={3}>
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
      <Stack direction="row" spacing={3}>
        <HomeTiles
          title="Saved Entries"
          descritpion="Saved workflows "
          route="saved"
          entrycount={4}></HomeTiles>
        <HomeTiles
          title="Build A Workflow"
          descritpion="Create a new workflow"
          route="build"
          entrycount={4}></HomeTiles>
      </Stack>
      <h4>Home</h4>
    </>
  );
}

export default Home;