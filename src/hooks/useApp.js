import { useEffect, useState } from "react";
import { getPicture } from "../services/getPicture";

const useApp = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const first = window.addEventListener("keyup", (e) => {
      if (e.key === "Backspace") {
        removeMoveable();
      }
    });
  
    return () => {
      window.removeEventListener("keyup", first);
    }
  }, []);
  

  const addMoveable = () => {
    const COLORS = ["red", "blue", "yellow", "green", "purple"];

    const id = Math.floor(Math.random() * Date.now());
    const numberOfElements = moveableComponents.length;

    getPicture({ id: numberOfElements }).then(({ url }) => {
      const newComponent = {
        id,
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        updateEnd: true,
        url,
      }

      setMoveableComponents([
        ...moveableComponents,
        newComponent,
      ]);
    });
  };

  const removeMoveable = () => {
    const updatedMoveables = moveableComponents.filter((moveable) => moveable.id !== selected);
    setMoveableComponents(updatedMoveables);
  }

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  return {
    moveableComponents,
    updateMoveable,
    setSelected,
    selected,
    addMoveable,
    removeMoveable,
  }
}

export default useApp