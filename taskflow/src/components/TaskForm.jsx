import { useEffect, useRef, useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  // Autoenfoca el input al montar el componente
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  // Maneja el envío del formulario 
  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setTitle("");
    inputRef.current?.focus();
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        New Task
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Learn React Router"
          aria-label="New task"
        />
      </label>

      <button type="submit">Add</button>
    </form>
  );
}
