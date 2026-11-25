
import {
  Check,
  CalendarDays,
  Pencil,
  Trash2
} from "lucide-react";

function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate).getTime() <
      new Date(new Date().toDateString()).getTime();

  const dueLabel = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })
    : "No due date";

  return (
    <article className={`task-card ${task.completed ? "is-completed" : ""}`}>
      <button
        className={`task-check ${task.completed ? "checked" : ""}`}
        onClick={() => onToggle(task._id)}
        aria-label="Toggle completion"
      >
        {task.completed && <Check size={15} />}
      </button>

      <div className="task-content">
        <div className="task-title-row">
          <h3>{task.title}</h3>

          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
          <span className="category-tag">{task.category}</span>

          <span className={isOverdue ? "overdue-date" : "date-label"}>
            <CalendarDays size={14} />
            {isOverdue ? "Overdue · " : ""}
            {dueLabel}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(task)} title="Edit task">
          <Pencil size={16} />
        </button>

        <button onClick={() => onDelete(task._id)} title="Delete task">
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
