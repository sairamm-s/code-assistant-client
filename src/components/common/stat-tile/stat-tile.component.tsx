import './stat-tile.component.scss';

interface StatTileProps {
  label: string;
  value: string | number;
}

const StatTileComponent = ({ label, value }: StatTileProps) => (
  <div className="stat-tile">
    <div className="stat-tile__label">{label}</div>
    <div className="stat-tile__value">{value}</div>
  </div>
);

export default StatTileComponent;
