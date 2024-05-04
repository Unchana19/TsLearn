import { useRef } from "react";

interface TaskFormProp {
  onAddItem: (name: string) => void;
}

export default function TaskForm({ onAddItem }: TaskFormProp): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const saveData = (e: React.FormEvent) => {
    e.preventDefault();
    const name = inputRef.current!.value;
    onAddItem(name);
    inputRef.current!.value = "";
  };

  return (
    <form onSubmit={saveData}>
      <input type="text" placeholder="Task" ref={inputRef} />
      <button type="submit">Save</button>
    </form>
  );
}