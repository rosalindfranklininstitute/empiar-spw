import { RJSFSchema, UiSchema, WidgetProps } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { Form } from "@rjsf/mui";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "../static/css/WorkFlowCard.css";
import { stepDictObject } from "../schema/WorkFlowStepSchemas";
import { ObjectType } from "typescript";
import { PropsWithChildren } from "react";
import { FormProps } from "@rjsf/core";
import Button from '@mui/material/Button';

interface WorkFlowCardProps {
  id: number | string,
  cardCollapseState: boolean;
  orderNumber: number;
  stepKey: string;
  stepTitle: string;
  data: any;
  handleCardCollapse: () => void;
  updateStepData: (stepData: any) => void;
  onRemove: (stepKey: string | number) => void;
  onCopyStep: (stepKey:string, stepTitle:string, stepData:any) => void;
}

export default function WorkFlowCard(props: WorkFlowCardProps) {
  let schema: RJSFSchema =
  stepDictObject[props.stepKey as keyof typeof stepDictObject]["schema"];
  let uiSchema: UiSchema =
  stepDictObject[props.stepKey as keyof typeof stepDictObject]["uischema"];



  const log = (type: string) => console.log.bind(console, type);
  const onSubmit = (data: any) => {
    let cardData:any = {};
    cardData = data.formData;
    cardData.ordernumber = props.orderNumber;
    cardData.method = props.stepTitle;
    props.updateStepData(cardData)
    props.handleCardCollapse();
  }
  return (
    <>
      <div>
        <Form
          schema={schema}
          validator={validator}
          onChange={log("changed")}
          onSubmit={onSubmit}
          onError={log("errors")}
          uiSchema={uiSchema}
          formData={props.data}
        ></Form>
        <Button variant="contained" onClick={() => props.onCopyStep(props.stepKey, props.stepTitle, props.data)}>Copy</Button>
        <Button variant="contained" onClick={() => props.onRemove(props.id)}>Delete</Button>
      </div>
    </>
  );
}

const formLoadDatas: any = {
  "reagentlist": [
      {
          "reagentdetail": {
              "reagent": "Acetone",
              "solvent": "Calcium Chloride"
          },
          "concentrationdetails": {
              "concentration": "1010",
              "concentrationunits": "%"
          }
      },
      {
          "reagentdetail": {
              "reagent": "Acetone",
              "solvent": "Acetone"
          },
          "concentrationdetails": {
              "concentration": "1111",
              "concentrationunits": "%W/V"
          }
      }
  ],
  "ph": 11,
  "temperature": {
      "temperature": 22,
      "temperatureunit": "K"
  },
  "duration": {
      "duration": 33,
      "durationunit": "Min"
  },
  "repeats": 44,
  "notes": "55",
  "safetynotes": "66",
  "instrument": {
      "instrumentname": "77",
      "instrumentwattage": "88"
  },
  "isundervaccum": true,
  "instrumentwattage": "99"
}