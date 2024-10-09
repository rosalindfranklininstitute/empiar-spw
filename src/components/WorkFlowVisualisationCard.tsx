import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
import { ChemicalFixationDataCard, PlungeFreezongDataCard, HighPressureFreezingDataCard, StainingDataCard, DehydrationDataCard, RinsingDataCard, InfiltrationDataCard, IncubationDataCard, OvenCuringDataCard, UvPolymerisationCuringDataCard } from "../schema/WorkFlowStepVisualiser";


const HeaderSection = styled(Paper)(({ theme }) => ({
  backgroundColor: 'green',
  ...theme.typography.body2,
  padding: 0,
  textAlign: 'left',
  color: theme.palette.text.secondary,
  borderRadius: 0
}));

const Title = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1976d2',
  ...theme.typography.body2,
  padding: 10,
  textAlign: 'left',
  color: 'white',
  borderRadius: 0,
  width: '100%',
}));


const OrderNumber = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1976d2',
  ...theme.typography.body2,
  padding: 10,
  textAlign: 'left',
  color: 'white',
  borderRadius: 0
}));

const Header = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: 10,
  textAlign: 'left',
  color: theme.palette.text.secondary,
  borderRadius: 0,
  width: '100%'
}));

const CardData = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  borderRadius: 0
}));



interface WorkFlowVisualisationCardProps {
  stepData: any,
}


export default function WorkFlowVisualisationCard(props: WorkFlowVisualisationCardProps) {
  const WorkFlowMetaData = () => {
    return (
      <Stack spacing={0}>
        <HeaderSection>
          {(props.stepData.entryid) &&
            <Stack direction="row" spacing={0} sx={{
              bgcolor: '#F3F6F9',
              color: '#1976d2',
              border:'1px solid #1976d2',
              padding: '10px'
            }}>
              <h2>{props.stepData.entryid}</h2>
            </Stack>
          }
          <Stack direction="row" spacing={0}>
            <Title>{props.stepData.metadata.name}</Title>
          </Stack>
        </HeaderSection>
        <CardData>
          <Stack direction="row" spacing={3}>
            <Chip label={props.stepData.metadata.imagingmethod} />
            <Chip label={props.stepData.metadata.biologicalentity} />
            <Chip label={props.stepData.metadata.studydescription} />
            {(props.stepData.doi) &&
              <Chip label={props.stepData.doi} />
            }
          </Stack>
        </CardData>
        {/* <CardData>{divCont}</CardData> */}
      </Stack>
    )
  }
  const WorkFlowData = () => {
    let listComponent: any = [];
    props.stepData.data.map((data: any) => {
      let cardData: any = {}
      if (data["method"] == "Chemical Fixation") {
        cardData = ChemicalFixationDataCard(data);
      }
      else if (data["method"] == "Plunge Freex") {
        cardData = PlungeFreezongDataCard(data);
      }
      else if (data["method"] == "High Pressure Freezing") {
        cardData = HighPressureFreezingDataCard(data);
      }
      else if (data["method"] == "Staining") {
        cardData = StainingDataCard(data);
      }
      else if (data["method"] == "Dehydration") {
        cardData = DehydrationDataCard(data);
      }
      else if (data["method"] == "Rinsing") {
        cardData = RinsingDataCard(data);
      }
      else if (data["method"] == "Infiltrationn") {
        cardData = InfiltrationDataCard(data);
      }
      else if (data["method"] == "Incubation") {
        cardData = IncubationDataCard(data);
      }
      else if (data["method"] == "Incubation") {
        cardData = IncubationDataCard(data);
      }
      else if (data["method"] == "Oven Curing") {
        cardData = OvenCuringDataCard(data);
      }
      else {
        cardData = UvPolymerisationCuringDataCard(data);
      }
      listComponent.push(
        <Stack spacing={0}>
          <HeaderSection>
            <Stack direction="row" spacing={0}>
              <OrderNumber>{data.ordernumber}</OrderNumber>
              <Header>{data.method}</Header>
            </Stack>
          </HeaderSection>
          <CardData>
            {cardData}
          </CardData>
        </Stack>
      )
    })
    return (
      <>
        {listComponent}
      </>
    )
  }

  return (
    <>
      <Stack id="workflow-vis" spacing={3}>
        {WorkFlowMetaData()}
        {WorkFlowData()}
      </Stack>
    </>
  )
}
