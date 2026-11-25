
import { ArrowUpRight } from "lucide-react";

function StatsCard({ title, value, description, icon: Icon, color }) {
  return (
    <div className="stats-card">
      <div className="stats-top">
        <div className={`stats-icon ${color}`}>
          <Icon size={21} />
        </div>
        <ArrowUpRight size={17} className="muted-icon" />
      </div>

      <h2>{value}</h2>
      <p className="stats-title">{title}</p>
      <span className="stats-description">{description}</span>
    </div>
  );
}

export default StatsCard;
