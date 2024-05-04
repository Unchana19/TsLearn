import Item from "../models/Item";
import Task from "./Task";

interface TaskListProp {
  items: Item[];
}

export default function TaskList(props: TaskListProp): JSX.Element {
  return (
    <div>
      <h1>Work in today</h1>
      <ul>
        {props.items.map((item) => {
          return <Task key={item.id} name={item.name} />;
        })}
      </ul>
    </div>
  );
}
