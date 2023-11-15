import workFlowForm from "../static/workFlowForm.json";

export interface WorkFlowStepProps {
  name: string;
  cardkey: string;
  color: string;
  onMenuClick: (cardkey: string) => void;
}

export interface WorkFlowStepsMenuProps {
  onMenuClick: (cardkey: string) => void;
}

function WorkFlowStep(props: WorkFlowStepProps) {
  const { name, color, cardkey, onMenuClick } = props;
  return (
    <div style={{ backgroundColor: color }}>
      <button type="button" onClick={() => onMenuClick(cardkey)}>
        {name}
      </button>
    </div>
  );
}

function WorkFlowStepsMenu({ onMenuClick }: WorkFlowStepsMenuProps) {
  const horizontalMenus = workFlowForm.horizontalmenus;
  return (
    <div id="menus-container">
      {horizontalMenus.map((menu, index) => (
        <WorkFlowStep
          name={menu.name}
          key={menu.key}
          cardkey={menu.cardkey}
          color={menu.color}
          onMenuClick={onMenuClick}
        ></WorkFlowStep>
      ))}
    </div>
  );
}

export default WorkFlowStepsMenu;
