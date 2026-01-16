import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
    // Muestra un mensaje si no hay tareas
    if (tasks.length === 0) {
    return (
      <article>
        <p style={{ margin: 0 }}>There are no tasks with those filters.</p>
      </article>
    );
  }
  // Muestra la lista de tareas
  return (
    <article>
      <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0, display: "grid", gap: 10 }}>
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>
    </article>
  );
}
