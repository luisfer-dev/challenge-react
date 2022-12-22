import { useRef } from "react";

const useComponent = ({
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
  const ref = useRef();

  let parent = document.getElementById("parent");
  let parentBounds = parent?.getBoundingClientRect();
  
  const onResize = async (e) => {
    let newWidth = e.width;
    let newHeight = e.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;

    if (positionMaxTop >= parentBounds?.height) {
      newHeight = parentBounds?.height - top;
    }
    if (positionMaxLeft >= parentBounds?.width) {
      newWidth = parentBounds?.width - left;
    }

    updateMoveable(id, {
      top,
      left,
      width: newWidth,
      height: newHeight,
      color,
      url
    });

    const beforeTranslate = e.drag.beforeTranslate;

    ref.current.style.width = `${e.width}px`;
    ref.current.style.height = `${e.height}px`;

    let translateX = beforeTranslate[0];
    let translateY = beforeTranslate[1];

    ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
  };

  const onResizeEnd = async (e) => {
    let newWidth = e.lastEvent?.width;
    let newHeight = e.lastEvent?.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;

    if (positionMaxTop > parentBounds?.height)
      newHeight = parentBounds?.height - top;
    if (positionMaxLeft > parentBounds?.width)
      newWidth = parentBounds?.width - left;

    const { lastEvent } = e;
    const { drag } = lastEvent;
    const { beforeTranslate } = drag;

    const absoluteTop = top + beforeTranslate[1];
    const absoluteLeft = left + beforeTranslate[0];

    updateMoveable(
      id,
      {
        top: absoluteTop,
        left: absoluteLeft,
        width: newWidth,
        height: newHeight,
        color,
        url
      },
      true
    );

    ref.current.style.transform = `translate(${0}px, ${0}px)`;
    setSelected(null);
  };

  const onDrag = (e) => {
    const positionMaxTop = e.top + height;
    const positionMaxLeft = e.left + width;
    const positionMaxBottom = e.top;
    const positionMaxRight = e.left;

    if (positionMaxTop > parentBounds?.height) {
      e.top = parentBounds?.height - height;
    }

    if (positionMaxLeft > parentBounds?.width) {
      e.left = parentBounds?.width - width;
    }

    if (positionMaxBottom <= 0) {
      e.top = 0;
    }

    if (positionMaxRight <= 0) {
      e.left = 0;
    }

    updateMoveable(id, {
      top: e.top,
      left: e.left,
      width,
      height,
      color,
      url
    });
  }

  return {
    ref,
    onResize,
    onResizeEnd,
    onDrag,
  }
}

export default useComponent