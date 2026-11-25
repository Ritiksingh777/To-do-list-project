
import { Search, Plus, Bell } from "lucide-react";

function Header({ search, setSearch, onAdd }) {
  return (
    <header className="top-header">
      <div>
        <p className="header-subtitle">YOUR PRODUCTIVITY SPACE</p>
        <h2>My Workspace</h2>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <kbd>⌘ K</kbd>
        </div>

        <button className="icon-button" aria-label="Notifications">
          <Bell size={19} />
        </button>

        <button className="primary-button" onClick={onAdd}>
          <Plus size={18} />
          Add Task
        </button>
      </div>
    </header>
  );
}

export default Header;
