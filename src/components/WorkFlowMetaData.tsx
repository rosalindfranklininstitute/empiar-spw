import { RJSFSchema, UiSchema, WidgetProps } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { Form } from "@rjsf/mui";
import "../static/css/WorkFlowCard.css";
import { metaDataObject } from "../schema/WorkFlowStepSchemas";
import React from "react";


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
    console.log("Data");
    console.log(console.log(data.formData));
    props.updateMetaData(data.formData);
  }
  return (
    <>
      <Form
        schema={schema}
        validator={validator}
        onChange={log("changed")}
        onSubmit={onSubmit}
        onError={log("errors")}
        uiSchema={uiSchema}
        formData={props.data}
      ></Form>
    </>
  );
}

export default React.memo(WorkFlowMetaData)

