import { useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import Item from "./models/Item";
import TaskForm from "./components/TaskForm";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  function generateID() {
    return Math.floor(Math.random()*1000000);
  }

  const addItem = (name:string) => {
    setItems([...items, {id: generateID(), name}]);
  }

  return (
    <div className="App">
      <TaskForm onAddItem={addItem} />
      <TaskList items={items} />
    </div>
  );
}

export default App;
