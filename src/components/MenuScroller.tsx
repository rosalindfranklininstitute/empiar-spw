import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import workFlowForm from "../static/workFlowForm.json";
import WorkFlowStep from "./WorkFlowStep";
import { stepMenus } from "../schema/WorkFlowStepSchemas";
import Stack from "@mui/material/Stack";
import { profile } from "console";
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export interface MenuScrollerProps {
  onMenuClick: (stepKey: string, stepTitle: string) => void;
}

function MenuScroller(props: MenuScrollerProps) {
  type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;
  const [items, setItems] = React.useState(stepMenus);
  const [position, setPosition] = React.useState(0);


  return (
    <div style={{
      padding: "1em 0em",
      width: "100%",
      background: "white",
      boxSizing: "border-box" // <--- this line
    }}>
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
    </div>
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
    <Button size="small" disabled={isFirstItemVisible} onClick={() => scrollPrev()} variant="outlined">
      <ArrowLeftIcon />
    </Button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Button size="small" disabled={isLastItemVisible} onClick={() => scrollNext()} variant="outlined">
      <ArrowRightIcon />
    </Button>
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
