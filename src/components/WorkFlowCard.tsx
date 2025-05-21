import { RJSFSchema, UiSchema, WidgetProps, getSubmitButtonOptions, SubmitButtonProps } from "@rjsf/utils";
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
import React from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Stack from "@mui/material/Stack";
import Tooltip from '@mui/material/Tooltip';



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
  onCopyStep: (stepKey: string, stepTitle: string, stepData: any) => void;
}

export default function WorkFlowCard(props: WorkFlowCardProps) {
  let schema: RJSFSchema =
    stepDictObject[props.stepKey as keyof typeof stepDictObject]["schema"];
  let uiSchema: UiSchema =
    stepDictObject[props.stepKey as keyof typeof stepDictObject]["uischema"];

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const setSnackBarContent = () => {
    return props.stepTitle + " card is saved succesfuly";
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function SubmitButton(props: SubmitButtonProps) {
    const { uiSchema } = props;
    const { norender } = getSubmitButtonOptions(uiSchema);
    if (norender) {
      return null;
    }
    return (
      <Button type='submit' variant="contained">
        <Tooltip title="This button will save the inputs for the current method and minimise the form to allow the user to begin capturing the next step">
            <a>Save Step</a>
        </Tooltip>
      </Button>
    );
  }

  const log = (type: string) => console.log.bind(console, type);
  const onSubmit = (data: any) => {
    let cardData: any = {};
    cardData = data.formData;
    cardData.ordernumber = props.orderNumber;
    cardData.method = props.stepTitle;
    props.updateStepData(cardData)
    props.handleCardCollapse();
    handleClick();
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
          templates={{ ButtonTemplates: { SubmitButton } }}
        ></Form>
        <Stack direction="row" spacing={2} alignContent="center">
          <Button variant="contained" onClick={() => props.onCopyStep(props.stepKey, props.stepTitle, props.data)}>
            <Tooltip title="This button will allow the user to dublicate the current step and all settings already captured">
              <a>Copy</a>
            </Tooltip>
          </Button>
          <Button variant="contained" onClick={() => props.onRemove(props.id)}>
            <Tooltip title="This button will delete the current step being worked on.">
              <a>Delete</a>
            </Tooltip>
          </Button>
        </Stack>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={setSnackBarContent()}
        action={action}
      />
    </>
  );
}