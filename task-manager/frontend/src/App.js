import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_BASE_URL = "http://localhost:5000/tasks";

const getPriorityLabel = (priority) => {
  if (priority >= 8) return "Critical";
  if (priority >= 5) return "High";
  if (priority >= 3) return "Medium";
  return "Low";
};

const getPriorityTone = (priority) => {
  if (priority >= 8) return "critical";
  if (priority >= 5) return "high";
  if (priority >= 3) return "medium";
  return "low";
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("5");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("5");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => b.priority - a.priority),
    [tasks]
  );

  const stats = useMemo(() => {
    const total = tasks.length;
    const highPriority = tasks.filter((task) => task.priority >= 5).length;
    const critical = tasks.filter((task) => task.priority >= 8).length;
    const avgPriority = total
      ? (
          tasks.reduce((sum, task) => sum + Number(task.priority || 0), 0) / total
        ).toFixed(1)
      : "0.0";

    return { total, highPriority, critical, avgPriority };
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(API_BASE_URL);

      if (!response.ok) {
        throw new Error("Unable to load tasks right now.");
      }

      const data = await response.json();
      setTasks(data);
    } catch (fetchError) {
      setError(fetchError.message || "Something went wrong while fetching tasks.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const resetEditState = () => {
    setEditId(null);
    setEditTitle("");
    setEditPriority("5");
  };

  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title before adding it.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          priority: Number(priority),
        }),
      });

      if (!response.ok) {
        throw new Error("Task could not be created.");
      }

      setTitle("");
      setPriority("5");
      fetchTasks();
    } catch (submitError) {
      setError(submitError.message || "Something went wrong while creating the task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Task could not be deleted.");
      }

      fetchTasks();
    } catch (deleteError) {
      setError(deleteError.message || "Something went wrong while deleting the task.");
    }
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditPriority(String(task.priority));
    setError("");
  };

  const updateTask = async (id) => {
    if (!editTitle.trim()) {
      setError("Task title cannot be empty.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle.trim(),
          priority: Number(editPriority),
        }),
      });

      if (!response.ok) {
        throw new Error("Task could not be updated.");
      }

      resetEditState();
      fetchTasks();
    } catch (updateError) {
      setError(updateError.message || "Something went wrong while updating the task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio-ready productivity app</p>
          <h1>Task Manager that looks polished, focused, and hiring-friendly.</h1>
          <p className="hero-text">
            Track priorities, keep work visible, and show a clean full-stack CRUD
            workflow with a UI that feels intentional.
          </p>

          <div className="stats-grid">
            <article className="stat-card">
              <span>Total Tasks</span>
              <strong>{stats.total}</strong>
            </article>
            <article className="stat-card">
              <span>High Priority</span>
              <strong>{stats.highPriority}</strong>
            </article>
            <article className="stat-card">
              <span>Critical</span>
              <strong>{stats.critical}</strong>
            </article>
            <article className="stat-card">
              <span>Avg. Priority</span>
              <strong>{stats.avgPriority}</strong>
            </article>
          </div>
        </div>

        <form className="composer-card" onSubmit={addTask}>
          <div className="card-heading">
            <p className="section-label">Create task</p>
            <h2>Add something meaningful</h2>
          </div>

          <label className="field">
            <span>Task title</span>
            <input
              type="text"
              placeholder="Prepare internship application"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Priority</span>
            <input
              type="number"
              min="0"
              max="10"
              placeholder="0 to 10"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            />
          </label>

          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Add Task"}
          </button>
        </form>
      </section>

      <section className="board-panel">
        <div className="board-header">
          <div>
            <p className="section-label">Task board</p>
            <h2>Priority-sorted overview</h2>
          </div>
          <button className="secondary-button" onClick={fetchTasks} type="button">
            Refresh
          </button>
        </div>

        {error ? <div className="message-banner error-banner">{error}</div> : null}

        {isLoading ? (
          <div className="empty-state">
            <h3>Loading tasks...</h3>
            <p>Pulling the latest data from your backend.</p>
          </div>
        ) : sortedTasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks yet</h3>
            <p>
              Add your first task to show the flow from React to Express and
              MongoDB.
            </p>
          </div>
        ) : (
          <div className="task-grid">
            {sortedTasks.map((task) => {
              const isEditing = editId === task._id;
              const tone = getPriorityTone(task.priority);

              return (
                <article className="task-card" key={task._id}>
                  <div className="task-card-top">
                    <span className={`priority-pill ${tone}`}>
                      {getPriorityLabel(task.priority)}
                    </span>
                    <span className="priority-score">P{task.priority}</span>
                  </div>

                  {isEditing ? (
                    <div className="edit-stack">
                      <label className="field">
                        <span>Title</span>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(event) => setEditTitle(event.target.value)}
                        />
                      </label>

                      <label className="field">
                        <span>Priority</span>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={editPriority}
                          onChange={(event) => setEditPriority(event.target.value)}
                        />
                      </label>

                      <div className="action-row">
                        <button
                          className="primary-button"
                          type="button"
                          onClick={() => updateTask(task._id)}
                          disabled={isSubmitting}
                        >
                          Save
                        </button>
                        <button
                          className="ghost-button"
                          type="button"
                          onClick={resetEditState}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3>{task.title}</h3>
                      <p className="task-meta">
                        Ranked as {getPriorityLabel(task.priority).toLowerCase()} impact
                        work for this queue.
                      </p>

                      <div className="action-row">
                        <button
                          className="secondary-button"
                          type="button"
                          onClick={() => startEdit(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="danger-button"
                          type="button"
                          onClick={() => deleteTask(task._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
