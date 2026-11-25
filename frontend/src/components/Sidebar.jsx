
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Clock,
  Settings,
  LogOut,
  ListTodo
} from "lucide-react";

function Sidebar({ filter, setFilter, stats }) {
  const menu = [
    {
      name: "All Tasks",
      value: "all",
      icon: LayoutDashboard,
      count: stats.total
    },
    {
      name: "My Tasks",
      value: "pending",
      icon: ListTodo,
      count: stats.pending
    },
    {
      name: "Completed",
      value: "completed",
      icon: CheckSquare,
      count: stats.completed
    },
    {
      name: "Upcoming",
      value: "upcoming",
      icon: CalendarDays,
      count: null
    },
    {
      name: "Overdue",
      value: "overdue",
      icon: Clock,
      count: null
    }
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <CheckSquare size={24} />
        </div>
        <span>TaskFlow</span>
      </div>

      <p className="menu-label">WORKSPACE</p>

      <nav className="side-menu">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.value}
              className={`menu-item ${
                filter === item.value ? "active" : ""
              }`}
              onClick={() => setFilter(item.value)}
            >
              <Icon size={19} />
              <span>{item.name}</span>

              {item.count !== null && (
                <span className="menu-count">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button className="menu-item" onClick={() => alert("Settings coming soon!")}>
          <Settings size={19} />
          Settings
        </button>

        <div className="profile">
          <div className="avatar">TF</div>
          <div>
            <strong>My Workspace</strong>
            <small>Personal account</small>
          </div>
          <LogOut size={17} />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
