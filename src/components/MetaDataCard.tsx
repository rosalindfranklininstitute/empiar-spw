import { RJSFSchema, UiSchema, WidgetProps } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { Form } from "@rjsf/mui";
import "../static/css/WorkFlowCard.css";
import { metaDataObject } from "../schema/WorkFlowStepSchemas";
import React from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import BasicCardHeader from "./BasicCardHeader";

const MetaDataPaper = styled(Paper)(({ theme }) => ({
  width: '75%',
  height: '75%',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

interface WorkFlowMetadataProps {
  id: number | string,
  data?: any;
  updateMetaData: (metaData: any) => void;
}

function WorkFlowMetaData(props: WorkFlowMetadataProps) {
  let schema: RJSFSchema = metaDataObject.metadata["schema"];
  let uiSchema: UiSchema = metaDataObject.metadata["uischema"];

  const log = (type: string) => console.log.bind(console, type);
  const onSubmit = (data: any) => {
    props.updateMetaData(data.formData);
  }
  return (
    <>
    <BasicCardHeader title="SPW - Metadata" width="75%"/>
      <MetaDataPaper square>
        <Form
          schema={schema}
          validator={validator}
          onSubmit={onSubmit}
          onError={log("errors")}
          uiSchema={uiSchema}
          formData={props.data}
        ></Form>
      </MetaDataPaper>
    </>
  );
}

export default React.memo(WorkFlowMetaData)

