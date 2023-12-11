import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export interface WorkFlowStepProps {
  name: string;
  stepKey: string;
  color: string;
  onMenuClick: (stepKey: string, stepTitle:string) => void;
}

function WorkFlowStep(props: WorkFlowStepProps) {
  const { name, stepKey, color } = props;
  const handleClick = props.onMenuClick;


  return (
    <div>
      <Button variant="contained" onClick={() => handleClick(stepKey, name)}
        style={{
          height: "3rem",
          borderRadius: 10,
          marginLeft: "15px",
        }}
        sx={{ whiteSpace: "nowrap" }}
      >
        {name}
      </Button>
    </div>
  );
}

export default WorkFlowStep;
