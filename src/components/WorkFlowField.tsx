interface WorkFlowFieldProps {
  name: string;
  fieldype: string;
  inputLable: string;
  inputValue: string;
  selectLabel?: string;
  selectValue?: string;
  selectOptions?: string[];
  isEnabled: boolean;
  data?: any;
  isValid?: boolean;
  handleChange: (name: string, {}) => void;
}

export default function WorkFlowField(props: WorkFlowFieldProps) {
  function handleOnChange() {
    if (props.fieldype == "inputselect") {
      props.handleChange(props.name, {});
    }
  }
  if (props.fieldype == "inputandselect") {
    return (
      <div>
        <label>
          {props.inputLable}
          <input
            value={props.inputValue}
            type="text"
            onChange={() => handleOnChange}
          ></input>
        </label>
        {props.selectOptions && props.selectLabel && (
          <label>
            {props.inputLable}
            <select name={props.selectLabel} onChange={() => handleOnChange}>
              {props.selectOptions.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>
          </label>
        )}
      </div>
    );
  } else {
    return (
      <label>
        {props.inputLable}
        <input
          value={props.inputValue}
          type="text"
          onChange={() => handleOnChange}
        ></input>
      </label>
    );
  }
}
