import React, { useState } from 'react';
import TimelineChart from './TimelineChart';
import './Tracker.css';

interface Story {
  id: string;
  title: string;
  priority: string;
  status: Status;
  assignee: string;
  storyPoints: number;
  type: 'story' | 'bug';
}

type Status = 'To Do' | 'In Progress' | 'Review' | 'Done';

interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  stories: Story[];
  bugs: Story[];
}

interface Release {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
  sprints: Sprint[];
  teamCapacity: number;
  plannedStories: number;
  completedStories: number;
  spilledOverStories: number;
}

interface ReleaseData {
  releases: Release[];
}

const releaseData: ReleaseData = require('../data/releaseData.json');

const Tracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'release' | 'sprint'>('release');
  const [selectedSprint, setSelectedSprint] = useState<string>('25.2.2');
  const [selectedProduct, setSelectedProduct] = useState<string>('apollo');

  const currentSprint = releaseData.releases
    .flatMap(release => release.sprints)
    .find(sprint => sprint.id === selectedSprint);

  const SprintView: React.FC = () => {
    if (!currentSprint) return null;

    const allItems = [...currentSprint.stories, ...currentSprint.bugs];
    
    const sprintsWithReleases = releaseData.releases.flatMap(release => 
      release.sprints.map(sprint => ({
        ...sprint,
        releaseName: release.name
      }))
    );
    
    const itemsByStatus = allItems.reduce((acc: Record<Status, Story[]>, item: Story) => {
      if (!acc[item.status]) {
        acc[item.status] = [];
      }
      acc[item.status].push(item);
      return acc;
    }, {} as Record<Status, Story[]>);

    const columns = [
      { title: 'To Do' as Status, items: itemsByStatus['To Do'] || [] },
      { title: 'In Progress' as Status, items: itemsByStatus['In Progress'] || [] },
      { title: 'Review' as Status, items: itemsByStatus['Review'] || [] },
      { title: 'Done' as Status, items: itemsByStatus['Done'] || [] }
    ];

    return (
      <div className="sprint-view">
        <div className="sprint-header">
          <div className="sprint-selector">
            <select 
              value={selectedSprint}
              onChange={(e) => setSelectedSprint(e.target.value)}
            >
              {sprintsWithReleases.map(sprint => (
                <option 
                  key={sprint.id} 
                  value={sprint.id}
                  disabled={sprint.id !== '25.2.2'}
                >
                  {`${sprint.releaseName} ${sprint.name}`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="kanban-container">
          {columns.map(column => (
            <div className="kanban-column" key={column.title}>
              <h3>{column.title}</h3>
              <div className="kanban-cards">
                {column.items.map(item => (
                  <div className={`kanban-card ${item.type}`} key={item.id}>
                    <div className="card-header">
                      <h4>{item.id}. {item.title}</h4>
                      <span className={`item-type ${item.type}`}>{item.type.toUpperCase()}</span>
                    </div>
                    <p>Priority: {item.priority}</p>
                    <div className="card-footer">
                      <span className="assignee">Assigned to: {item.assignee}</span>
                      {item.type === 'story' && <span className="story-points">{item.storyPoints} points</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="health-header">
        <h2>Release Tracker</h2>
        <p className="subtitle">Track and manage your releases and sprints in real-time</p>
      </div>

      <div className="product-selector">
        <label htmlFor="product">Product</label>
        <select 
          id="product" 
          value={selectedProduct} 
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="apollo">Apollo</option>
          <option value="artemis" disabled>Artemis</option>
          <option value="athena" disabled>Athena</option>
          <option value="hermes" disabled>Hermes</option>
        </select>
      </div>

      <div className="tracker-container">
        <div className="tab-container">
          <div className="tabs">
            <div
              className={`tab ${activeTab === 'release' ? 'active' : ''}`}
              onClick={() => setActiveTab('release')}
            >
              Release
            </div>
            <div
              className={`tab ${activeTab === 'sprint' ? 'active' : ''}`}
              onClick={() => setActiveTab('sprint')}
            >
              Sprint
            </div>
          </div>
          <div className="tab-content">
            {activeTab === 'release' ? (
              <TimelineChart releases={releaseData.releases} />
            ) : (
              <SprintView />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker; 