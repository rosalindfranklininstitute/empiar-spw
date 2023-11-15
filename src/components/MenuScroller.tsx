import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import workFlowForm from "../static/workFlowForm.json";
import WorkFlowStep from "./WorkFlowStep";
import { stepMenus } from "../schema/WorkFlowStepSchemas";
import Stack from "@mui/material/Stack";
import { profile } from "console";

export interface MenuScrollerProps {
  onMenuClick: (stepKey: string, stepTitle: string) => void;
}

function MenuScroller(props: MenuScrollerProps) {
  type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;
  const [items, setItems] = React.useState(stepMenus);
  const [position, setPosition] = React.useState(0);


  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {stepMenus.map((menu, index) => (
        <WorkFlowStep
          key={menu.stepkey}
          name={menu.name}
          stepKey={menu.stepkey}
          color={menu.color}
          onMenuClick={props.onMenuClick}
        ></WorkFlowStep>
      ))}
    </ScrollMenu>
  );
}

function Arrow({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none",
      }}
    >
      {children}
    </button>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      Left
    </Arrow>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
      Right
    </Arrow>
  );
}

function Card({
  onClick,
  selected,
  title,
  itemId,
}: {
  disabled?: boolean;
  onClick: Function;
  selected: boolean;
  title: string;
  itemId: string;
}) {
  const visibility = React.useContext(VisibilityContext);

  return (
    <div
      onClick={() => onClick(visibility)}
      style={{
        width: "160px",
      }}
      tabIndex={0}
    >
      <div className="card">
        <div>{title}</div>
        <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
        <div>selected: {JSON.stringify(!!selected)}</div>
      </div>
      <div
        style={{
          height: "200px",
        }}
      />
    </div>
  );
}

export default MenuScroller;
