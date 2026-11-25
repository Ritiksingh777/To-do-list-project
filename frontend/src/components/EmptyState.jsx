
import { ClipboardList } from "lucide-react";

function EmptyState({ onAdd }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <ClipboardList size={34} />
      </div>

      <h3>No tasks found</h3>
      <p>Your workspace is looking clear. Create a task to get started.</p>

      <button className="primary-button" onClick={onAdd}>
        + Create your first task
      </button>
    </div>
  );
}

export default EmptyState;
