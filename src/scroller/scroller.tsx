import "./safari-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import { LeftArrow, RightArrow } from "./arrows";
import { Card } from "./card";
import { Footer } from "./footer";
import { Header } from "./header";
import "./globalStyles.css";

// NOTE: embrace power of CSS flexbox!
// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
// import "./arrowsOnBottomOrTop.css";
// import "./hideScrollbar.css";
// import "./firstItemMargin.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = "test";
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

function Scroller() {
  const [items] = React.useState(getItems);
  const [selected, setSelected] = React.useState<string[]>([]);
  // can save and restore position if needed
  const [position, setPosition] = React.useState(100);

  const isItemSelected = (id: string): boolean =>
    !!selected.find((el) => el === id);

  const handleItemClick =
    (itemId: string) =>
    ({ getItemById }: scrollVisibilityApiType) => {
      const itemSelected = isItemSelected(itemId);

      console.log(getItemById(itemId));

      setSelected((currentSelected: string[]) =>
        itemSelected
          ? currentSelected.filter((el) => el !== itemId)
          : currentSelected.concat(itemId)
      );
    };

  const restorePosition = React.useCallback(
    ({
      scrollContainer,
    }: // getItemById,
    // scrollToItem
    scrollVisibilityApiType) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft = position;
        // scrollToItem(getItemById('test15'), 'auto');
      }
    },
    [position]
  );

  const savePosition = React.useCallback(
    ({ scrollContainer }: scrollVisibilityApiType) =>
      !!scrollContainer.current &&
      setPosition(scrollContainer.current.scrollLeft),
    []
  );

  return (
    <>
      <Header />
      <div className="example" style={{ paddingTop: "100px" }}>
        <div>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onInit={restorePosition}
            onScroll={savePosition}
            onWheel={onWheel}
          >
            {items.map(({ id }) => (
              <Card
                title={id}
                itemId={id} // NOTE: itemId is required for track items
                key={id}
                onClick={handleItemClick(id)}
                selected={isItemSelected(id)}
              />
            ))}
          </ScrollMenu>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Scroller;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
