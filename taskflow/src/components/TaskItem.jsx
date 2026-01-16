import { useEffect, useRef, useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const inputRef = useRef(null);

  // Focus al input cuando entramos en edición
  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);
  // Funciones de edición
  function startEditing() {
    setDraft(task.title);      
    setIsEditing(true);
  }
  // Cancela la edición
  function cancelEditing() {
    setDraft(task.title);      
    setIsEditing(false);
  }
  // Guarda los cambios
  function saveEditing() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onEdit(task.id, trimmed);
    setIsEditing(false);
  }
  // Maneja teclas enter y escape en el input
  function handleKeyDown(e) {
    if (e.key === "Enter") saveEditing();
    if (e.key === "Escape") cancelEditing();
  }
  
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        justifyContent: "space-between",
      }}
    >
      {!isEditing ? (
        <label style={{ display: "flex", alignItems: "center", gap: 10, margin: 0, flex: 1 }}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task.id)}
          />

          <span
            onDoubleClick={startEditing}
            title="Doble click para editar"
            style={{
              textDecoration: task.done ? "line-through" : "none",
              cursor: "text",
            }}
          >
            {task.title}
          </span>
        </label>
      ) : (
        <div style={{ flex: 1 }}>
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Editar tarea"
          />
          <small>Enter to save · Esc to cancel</small>
        </div>
      )}

      {!isEditing ? (
        <div style={{ display: "flex", gap: 8 }}>
          <button className="secondary" onClick={startEditing}>
            Edit
          </button>
          <button className="secondary" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={saveEditing}>Save</button>
          <button className="secondary" onClick={cancelEditing}>
            Cancel
          </button>
        </div>
      )}
    </li>
  );
}
