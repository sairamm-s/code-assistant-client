import './tabs.component.scss';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

const TabsComponent = ({ tabs, activeTab, onChange }: TabsProps) => (
  <div className="tabs">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        type="button"
        className={`tabs__item${tab.id === activeTab ? ' tabs__item--active' : ''}`}
        onClick={() => onChange(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default TabsComponent;
