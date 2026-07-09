import { LucideIcon } from 'lucide-react';
import './sidebar-nav.component.scss';

interface SidebarNavItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
}

const SidebarNavComponent = ({ items }: SidebarNavProps) => (
  <nav className="sidebar-nav">
    {items.map((item) => {
      const Icon = item.icon;
      return (
        <div key={item.label} className={`sidebar-nav__item${item.active ? ' sidebar-nav__item--active' : ''}`}>
          <Icon size={16} strokeWidth={1.5} />
          <span>{item.label}</span>
        </div>
      );
    })}
  </nav>
);

export default SidebarNavComponent;
