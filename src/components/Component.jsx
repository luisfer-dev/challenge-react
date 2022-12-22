import { flushSync } from "react-dom";

import Moveable from "react-moveable";
import useComponent from "../hooks/useComponent";

const Component = ({
  updateMoveable,
  top,
  left,
  width,
  height,
  color,
  id,
  setSelected,
  isSelected = false,
  url
}) => {

  const {
    ref,
    onResize,
    onResizeEnd,
    onDrag,
  } = useComponent({
    updateMoveable,
    top,
    left,
    width,
    height,
    color,
    id,
    setSelected,
    isSelected,
    url
  })

  return (
    <>
      <div
        ref={ref}
        className="draggable"
        id={"component-" + id}
        style={{
          position: "absolute",
          top: top,
          left: left,
          width: width,
          height: height,
          background: `url(${url})`,
          backgroundSize: "cover",
          objectFit: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => setSelected(id)}
      />

      <Moveable
        flushSync={flushSync}
        target={isSelected && ref.current}
        resizable
        draggable
        edgeDraggable={false}
        onDrag={onDrag}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        keepRatio={false}
        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
        edge
        throttleDrag={1}
        zoom={1}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
      />
    </>
  );
};

export default Component;
