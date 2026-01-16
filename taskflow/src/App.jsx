import { useMemo, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import Filters from "./components/Filters.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

function createTask(title) {
  return {
    id: crypto.randomUUID(),
    title,
    done: false,
    createdAt: Date.now(),
  };
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage("taskflow.tasks", []);
  const [filter, setFilter] = useState("all"); // all | active | done
  const [query, setQuery] = useState("");

    // Agrega una nueva tarea
  function addTask(title) {
    const newTask = createTask(title);
    setTasks((prev) => [newTask, ...prev]);
  }
  // Alterna el estado de una tarea
  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }
  // Edita el título de una tarea
  function editTask(id, newTitle) {
  const trimmed = newTitle.trim();
  if (!trimmed) return; 

  setTasks((prev) =>
    prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t))
  );
}

  // Elimina una tarea
  function deleteTask(id) {
    const ok = window.confirm("¿Delete this task?");
    if (!ok) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }
  // Cuenta las tareas activas
  const activeCount = useMemo(() => tasks.filter((t) => !t.done).length, [tasks]);
  // Filtra y busca las tareas visibles
  const visibleTasks = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tasks
      .filter((t) => {
        if (filter === "active") return !t.done;
        if (filter === "done") return t.done;
        return true;
      })
      .filter((t) => {
        if (!q) return true;
        return t.title.toLowerCase().includes(q);
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [tasks, filter, query]);

  return (
    <main className="container">
      <nav>
        <ul>
          <li>
            <strong>TaskFlow</strong>
          </li>
        </ul>
        <ul>
          <li>
            <small>React + Pico CSS + localStorage</small>
          </li>
        </ul>
      </nav>

      <TaskForm onAdd={addTask} />

      <Filters
        filter={filter}
        setFilter={setFilter}
        query={query}
        setQuery={setQuery}
        activeCount={activeCount}
        totalCount={tasks.length}
      />

      <TaskList tasks={visibleTasks} onToggle={toggleTask} onEdit={editTask} onDelete={deleteTask} />

      <footer style={{ marginTop: 16 }}>
        <small>
          Use the filters to search and view your tasks. Your data is saved in localStorage.
        </small>
      </footer>
    </main>
  );
}
