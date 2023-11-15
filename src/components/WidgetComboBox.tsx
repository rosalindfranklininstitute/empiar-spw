import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = [0,1];

interface WorkFlowComboBoxProps {
    options: Array<any>[];
  }

export default function ControllableStates(props:WorkFlowComboBoxProps) {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <Autocomplete
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={props.options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
      />
    </div>
  );
}