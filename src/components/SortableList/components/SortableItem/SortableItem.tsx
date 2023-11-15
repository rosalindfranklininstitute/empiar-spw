import React, { createContext, useContext, useMemo, useState } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import WorkFlowCard from "../../../WorkFlowCard";
import "./SortableItem.css";

interface Props {
  id: UniqueIdentifier;
  stepTitle: string;
  stepKey: string;
  orderNumber: number;
  stepData?: any,
  onRemove:(stepKey:string|number) => void;
  onCopyStep:(stepKey:string, stepTitle:string, stepData:any) => void;
  onUpdateWidgetData: (stepId:string|number, stepData:any) => void;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() { },
});

export function SortableItem({ children, id, stepTitle, stepKey, orderNumber,stepData, onRemove, onCopyStep, onUpdateWidgetData }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const [cardCollapseState, setCardCollapseState] = useState(false);
  const [itemData, setItemData] = useState<any>(stepData);

  function updateItemData(stepData: any){
    onUpdateWidgetData(id, stepData);
    setItemData(stepData);
  }

  function handleCardCollapse() {
    setCardCollapseState((cardCollapseState) => !cardCollapseState);
  }
  let data: any={};

  return (
    <SortableItemContext.Provider value={context}>
      <div ref={setNodeRef} style={style}>
        <Accordion expanded={cardCollapseState}>
          <AccordionSummary onClick={handleCardCollapse}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          ><DragHandle></DragHandle>
            <h3 style={{ marginLeft: "10px" }}>{orderNumber}</h3>
            <h4 style={{ marginLeft: "10px" }}>{stepTitle}</h4>
          </AccordionSummary>
          <AccordionDetails>
            <WorkFlowCard
              id={id}
              stepKey={stepKey}
              stepTitle={stepTitle}
              orderNumber={orderNumber}
              cardCollapseState={cardCollapseState}
              handleCardCollapse={handleCardCollapse}
              data={itemData}
              updateStepData={updateItemData}
              onRemove={onRemove}
              onCopyStep={onCopyStep}
            ></WorkFlowCard>
          </AccordionDetails>
        </Accordion>
      </div>
    </SortableItemContext.Provider>
  );
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <button className="DragHandle" {...attributes} {...listeners} ref={ref}>
      <svg viewBox="0 0 20 20" width="12">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
    </button>
  );
}
