
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  category: "Personal",
  priority: "Medium",
  dueDate: ""
};

function TaskModal({ open, onClose, onSave, editingTask }) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description || "",
        category: editingTask.category,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate
          ? new Date(editingTask.dueDate).toISOString().slice(0, 10)
          : ""
      });
    } else {
      setForm(initialForm);
    }
  }, [editingTask, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    setSaving(true);

    try {
      await onSave({
        ...form,
        title: form.title.trim(),
        dueDate: form.dueDate || null
      });
      onClose();
    } catch {
      // The dashboard displays the API error.
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="task-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">TASK MANAGEMENT</span>
            <h2>{editingTask ? "Edit Task" : "Create New Task"}</h2>
          </div>

          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Task Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            maxLength={120}
            required
            autoFocus
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add some details..."
            rows={3}
            maxLength={1000}
          />

          <div className="form-grid">
            <div>
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option>Personal</option>
                <option>Work</option>
                <option>Study</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label>Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />

          <div className="modal-footer">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving ? "Saving..." : editingTask ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
