import Component from "./components/Component";
import useApp from "./hooks/useApp";

const App = () => {
  const {
    moveableComponents,
    updateMoveable,
    setSelected,
    selected,
    addMoveable,
    removeMoveable,
  } = useApp()

  return (
    <main id="main-container">
      <div
        id="parent"
      >
        {moveableComponents.map((item, index) => (
          <Component
            {...item}
            key={index}
            updateMoveable={updateMoveable}
            setSelected={setSelected}
            isSelected={selected === item.id}
          />
        ))}
      </div>

      <div id="actions-container">
        <button onClick={addMoveable}>Add Moveable</button>
        <button onClick={removeMoveable}>Remove Moveable</button>
      </div>
    </main>
  );
};

export default App;
