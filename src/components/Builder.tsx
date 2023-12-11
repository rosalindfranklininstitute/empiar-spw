import workflowForm from "../static/workFlowForm.json";
import MenuScroller from "./MenuScroller";
import { useCallback, useEffect, useState } from "react";
import { SortableList } from "./SortableList";
import WorkFlowBuilderPh from "../static/components/WorkFlowBuilderPh";
import { ListItemReferenceProps } from '../utils/WidgetDataUtility';
import { LoadWidgetReferenceList } from '../utils/WidgetUtility';
import WorkFlowMetaData from "./MetaDataCard";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BuilderSteps from "./BuilderSteps";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


import "../widget/Widget.css";

interface SamplePrepWidgetProps {
  jsonSchemaUrl?: string;
  submitUrl: string;
  widgetData?: any;
}

const MetaDataPaper = styled(Paper)(({ theme }) => ({
  width: '75%',
  height: '75%',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));
let formData: any = {}
function Builder(props: SamplePrepWidgetProps) {
  let metaDataToLoad: any = {};
  if (props.widgetData) {
    metaDataToLoad = props.widgetData["metadata"];
  }
  
  const [metaData, setMetaData] = useState<any>(metaDataToLoad)
  const [listReference, setListReference] = useState<ListItemReferenceProps[]>([]);
  const [toggleValue, setToggleValue] = useState<number>(0);
  const memoizedUpdateMetaData = useCallback(handleUpdateMetaData, [metaData]);

  


  useEffect(() => {
    let isInitialLoad = true;
    async function fetchWidgetData(workFlowData: any) {
      if (props.widgetData) {
        let correctedListReference: Array<ListItemReferenceProps> = [];
        correctedListReference = await LoadWidgetReferenceList(workFlowData);
        if (correctedListReference.length > 0 &&
          isInitialLoad == true) {
          setListReference(correctedListReference);
        }
        correctedListReference.map((data: any) => {
          formData[data.id] = data.stepData;
        });
      }
    }
    fetchWidgetData(props.widgetData);

    return () => {
      isInitialLoad = false;
    };
  }, []);


  function handleAddMenuClick(stepKey: string, stepTitle: string, stepData?: any) {
    let listReferenceLength = 0;
    if (listReference) {
      listReferenceLength = listReference.length;
    }
    let listReferenceItem = {
      id: stepKey + listReferenceLength,
      orderNumber: listReferenceLength + 1,
      stepKey: stepKey,
      stepTitle: stepTitle,
      stepData: stepData
    };
    const correctedListReference = listReference.slice();
    correctedListReference.push(listReferenceItem);
    setListReference(correctedListReference);
  }

  function handleRemoveClick(stepId: string | number) {
    let correctedListReference = listReference.slice();
    correctedListReference.map((listItem, index) => {
      if (listItem.id == stepId) {
        correctedListReference.splice(index, 1)
      }
    });
    correctedListReference.map((listItem, index) => {
      listItem.orderNumber = index + 1;
    });
    delete formData[stepId];
    setListReference(correctedListReference);
  }

  function handleUpdateWidgetData(stepId: string | number, stepData: any) {
    formData[stepId] = stepData;
    console.log(formData);
    console.log(metaData);
  }

  function handleUpdateMetaData(collectedMetaData: any) {
    setMetaData(collectedMetaData);
  }

  function handleBreadCrumbClick(selectedKey: number) {
    setToggleValue(selectedKey)
  }

  function submitWorkFlow() {
    let workFlowCollectedData: any = {};
    let reorgWorkFlowData: any[] = [];
    for (const key in formData) {
      if (key === "metadata") {
        workFlowCollectedData["metadata"] = formData["metadata"];
      }
      else {
        reorgWorkFlowData.push(formData[key]);
      }
    }
    workFlowCollectedData["data"] = reorgWorkFlowData;
    console.log("Submitted Data:");
    console.log(workFlowCollectedData);
    console.log(metaData);
  }

  function fetchWorkFlowTitle(){
    return metaData.name;
  }

  if (props.jsonSchemaUrl) {
    const title = workflowForm.title;
    return (
      <>
        {/* <ButtonAppBar></ButtonAppBar> */}
        <CssBaseline />
        <Container fixed>
          <BuilderSteps onSelectionChange={handleBreadCrumbClick}></BuilderSteps>
          <div>
            <div id="metadatacontainer" hidden={!(toggleValue == 0)}>
              <MetaDataPaper square>
                <WorkFlowMetaData id="1" data={metaData} updateMetaData={memoizedUpdateMetaData}></WorkFlowMetaData>
              </MetaDataPaper>
            </div>
            <div id="stepscontainer" hidden={!(toggleValue == 1)}>
              <MetaDataPaper square>
                <Typography variant="h6" sx={{ my: 2 }}>
                  {fetchWorkFlowTitle()}
                </Typography>
                <Divider />
                <MenuScroller onMenuClick={handleAddMenuClick}></MenuScroller>

                {listReference && listReference.length >= 1 ? (
                  <SortableList
                    items={listReference}
                    onChange={setListReference}
                    renderItem={(item) => (
                      <SortableList.Item
                        id={item.id}
                        stepKey={item.stepKey}
                        stepTitle={item.stepTitle}
                        orderNumber={item.orderNumber}
                        onRemove={handleRemoveClick}
                        stepData={item.stepData}
                        onCopyStep={handleAddMenuClick}
                        onUpdateWidgetData={handleUpdateWidgetData}
                      >
                        {item.id}
                        {/* <SortableList.DragHandle /> */}
                      </SortableList.Item>
                    )}
                  />
                ) : (
                  <WorkFlowBuilderPh></WorkFlowBuilderPh>
                )}
                <div className="row">
                  <button onClick={submitWorkFlow}>Submit</button>
                </div>
              </MetaDataPaper>
            </div>
          </div>
        </Container>
      </>
    );
  } else {
    return <h1>Load from URL</h1>;
  }
}

export default Builder;
