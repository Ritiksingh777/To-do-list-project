
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleDashed,
  ListTodo,
  Target,
  Sparkles,
  RefreshCw
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import EmptyState from "../components/EmptyState";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask
} from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.length - completed;

    return {
      total: tasks.length,
      completed,
      pending,
      progress: tasks.length
        ? Math.round((completed / tasks.length) * 100)
        : 0
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description || "").toLowerCase().includes(search.toLowerCase());

      let matchesFilter = true;

      if (filter === "pending") {
        matchesFilter = !task.completed;
      } else if (filter === "completed") {
        matchesFilter = task.completed;
      } else if (filter === "upcoming") {
        matchesFilter =
          !task.completed &&
          task.dueDate &&
          new Date(task.dueDate) >= today;
      } else if (filter === "overdue") {
        matchesFilter =
          !task.completed &&
          task.dueDate &&
          new Date(task.dueDate) < today;
      }

      return matchesSearch && matchesFilter;
    });
  }, [tasks, filter, search]);

  const handleSave = async (form) => {
    try {
      setError("");

      if (editingTask) {
        const updated = await updateTask(editingTask._id, form);

        setTasks((prev) =>
          prev.map((task) =>
            task._id === editingTask._id ? updated : task
          )
        );
      } else {
        const created = await createTask(form);
        setTasks((prev) => [created, ...prev]);
      }

      setEditingTask(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      const updated = await toggleTask(id);

      setTasks((prev) =>
        prev.map((task) => task._id === id ? updated : task)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setOpenModal(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditingTask(null);
  };

  const filterTitles = {
    all: "All Tasks",
    pending: "My Tasks",
    completed: "Completed Tasks",
    upcoming: "Upcoming Tasks",
    overdue: "Overdue Tasks"
  };

  return (
    <div className="app-layout">
      <Sidebar
        filter={filter}
        setFilter={setFilter}
        stats={stats}
      />

      <main className="main-content">
        <Header
          search={search}
          setSearch={setSearch}
          onAdd={openCreateModal}
        />

        <section className="dashboard-content">

          <div className="welcome-section">
            <div>
              <div className="welcome-label">
                <Sparkles size={15} />
                YOUR DAILY OVERVIEW
              </div>

              <h1>Good things take <span>time.</span></h1>

              <p>
                Stay focused, stay organized, and make every day count.
              </p>
            </div>

            <button
              className="refresh-button"
              onClick={loadTasks}
              title="Refresh tasks"
            >
              <RefreshCw size={17} />
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
              <button onClick={() => setError("")}>Dismiss</button>
            </div>
          )}

          <div className="stats-grid">
            <StatsCard
              title="Total Tasks"
              value={stats.total}
              description="Tasks in your workspace"
              icon={ListTodo}
              color="purple"
            />

            <StatsCard
              title="In Progress"
              value={stats.pending}
              description="Tasks waiting for you"
              icon={CircleDashed}
              color="orange"
            />

            <StatsCard
              title="Completed"
              value={stats.completed}
              description="Tasks successfully finished"
              icon={CheckCircle2}
              color="green"
            />

            <StatsCard
              title="Productivity"
              value={`${stats.progress}%`}
              description="Overall completion rate"
              icon={Target}
              color="blue"
            />
          </div>

          <section className="progress-section">
            <div className="progress-info">
              <div>
                <span className="section-eyebrow">YOUR PROGRESS</span>
                <h3>Keep up the great work!</h3>
              </div>

              <strong>{stats.progress}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${stats.progress}%` }}
              />
            </div>

            <p>
              You've completed {stats.completed} out of {stats.total} tasks.
            </p>
          </section>

          <section className="tasks-section">
            <div className="tasks-heading">
              <div>
                <span className="section-eyebrow">YOUR WORKSPACE</span>
                <h2>{filterTitles[filter]}</h2>
              </div>

              <button className="primary-button" onClick={openCreateModal}>
                + New Task
              </button>
            </div>

            <div className="filter-tabs">
              {[
                ["all", "All"],
                ["pending", "Pending"],
                ["completed", "Completed"],
                ["upcoming", "Upcoming"],
                ["overdue", "Overdue"]
              ].map(([value, label]) => (
                <button
                  key={value}
                  className={filter === value ? "tab active-tab" : "tab"}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="loading-state">
                <div className="spinner" />
                Loading your tasks...
              </div>
            ) : filteredTasks.length === 0 ? (
              <EmptyState onAdd={openCreateModal} />
            ) : (
              <div className="task-list">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onToggle={handleToggle}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </section>

          <footer className="footer">
            Made for better productivity · TaskFlow
          </footer>
        </section>
      </main>

      <TaskModal
        open={openModal}
        onClose={closeModal}
        onSave={handleSave}
        editingTask={editingTask}
      />
    </div>
  );
}

export default Dashboard;
