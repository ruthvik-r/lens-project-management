import React, { useMemo, useState, useRef, useEffect } from 'react';
import './TimelineChart.css';

interface Story {
  id: string;
  title: string;
  priority: string;
  status: string;
  assignee: string;
  storyPoints: number;
}

interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  stories: Story[];
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

interface TimelineChartProps {
  releases: Release[];
}

const TimelineChart: React.FC<TimelineChartProps> = ({ releases }) => {
  const [hoveredRelease, setHoveredRelease] = useState<Release | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const chartRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedYear, setSelectedYear] = useState<string>("2025");

  // Hardcoded current date as April 16, 2025
  const currentDate = useMemo(() => new Date('2025-04-16'), []);
  const startYear = useMemo(() => new Date(`${selectedYear}-01-01`), [selectedYear]);
  const endYear = useMemo(() => new Date(`${selectedYear}-12-31`), [selectedYear]);

  // Check if we're on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll to current date position on mobile
  useEffect(() => {
    if (chartRef.current && isMobile) {
      const currentPosition = (getPosition(currentDate) / 100) * (chartRef.current.scrollWidth);
      const scrollPosition = Math.max(0, currentPosition - (chartRef.current.clientWidth / 2));
      
      // Delay the scroll slightly to allow render to complete
      setTimeout(() => {
        chartRef.current?.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [isMobile, currentDate]);

  const months = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => {
      const date = new Date(2025, i, 1);
      return {
        name: date.toLocaleString('default', { month: 'short' }),
        position: ((date.getTime() - startYear.getTime()) / (endYear.getTime() - startYear.getTime())) * 100,
      };
    }), [startYear, endYear]);

  const getPosition = (date: Date): number => {
    return ((date.getTime() - startYear.getTime()) / (endYear.getTime() - startYear.getTime())) * 100;
  };

  const getCurrentRelease = (releases: Release[]): Release | undefined => {
    return releases.find(release => {
      const start = new Date(release.startDate);
      const end = new Date(release.endDate);
      return currentDate >= start && currentDate <= end;
    });
  };

  const getReleaseColor = (release: Release): string => {
    const endDate = new Date(release.endDate);
    if (endDate < currentDate) {
      return '#2e7d32'; // Completed releases in green
    }
    if (currentRelease?.id === release.id) {
      return '#F97316'; // Current release in orange
    }
    return '#0D9488'; // Upcoming releases in teal
  };

  const handleReleaseHover = (event: React.MouseEvent, release: Release) => {
    // Avoid showing tooltip on mobile (use tap instead)
    if (!isMobile) {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: event.clientX,
        y: event.clientY + 10 // Position 10px below the cursor
      });
      setHoveredRelease(release);
    }
  };
  
  const handleReleaseTap = (event: React.MouseEvent, release: Release) => {
    // For mobile, show tooltip on tap
    if (isMobile) {
      // If already showing this release, hide it (toggle behavior)
      if (hoveredRelease && hoveredRelease.id === release.id) {
        setHoveredRelease(null);
      } else {
        // Center the tooltip on mobile screens
        setTooltipPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2 - 100 // Position slightly above center for better visibility
        });
        setHoveredRelease(release);
      }
    }
  };

  const handleReleaseLeave = () => {
    if (!isMobile) {
      setHoveredRelease(null);
    }
  };

  const currentRelease = getCurrentRelease(releases);
  
  // Calculate appropriate SVG height based on number of releases
  const svgHeight = Math.max(isMobile ? 400 : 300, releases.length * (isMobile ? 70 : 50) + 100);

  // Close the tooltip when clicking outside of it on mobile
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking the overlay itself, not its children
    if (e.target === e.currentTarget) {
      setHoveredRelease(null);
    }
  };

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <div className="year-selector">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="2024" disabled>2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        {currentRelease && (
          <div className="current-release-info">
            Currently in {currentRelease.name}
          </div>
        )}
      </div>
      <div className="timeline-chart" ref={chartRef}>
        <svg 
          viewBox={`0 0 1000 ${svgHeight}`} 
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height={svgHeight}
        >
          {/* Month markers */}
          {months.map((month) => (
            <g key={month.name}>
              <line
                x1={`${month.position}%`}
                y1="0"
                x2={`${month.position}%`}
                y2="100%"
                stroke="#e9ecef"
                strokeWidth="1"
              />
              <text
                x={`${month.position}%`}
                y="20"
                textAnchor="middle"
                fill="#666"
                fontSize="12"
              >
                {month.name}
              </text>
            </g>
          ))}

          {/* Release bars */}
          {releases.map((release, index) => {
            const startPos = getPosition(new Date(release.startDate));
            const endPos = getPosition(new Date(release.endDate));
            const width = Math.max(0, endPos - startPos);
            const isCurrent = currentRelease?.id === release.id;
            const yPosition = 60 + (index * (isMobile ? 70 : 50)); // Increased spacing between releases on mobile
            const color = getReleaseColor(release);
            
            return (
              <g 
                key={release.id}
                onMouseEnter={(e) => handleReleaseHover(e, release)}
                onMouseLeave={handleReleaseLeave}
                onClick={(e) => handleReleaseTap(e, release)}
                className="release-group"
              >
                <rect
                  x={`${startPos}%`}
                  y={yPosition}
                  width={`${width}%`}
                  height={isMobile ? "40" : "30"}
                  fill={color}
                  rx="4"
                  ry="4"
                  className={isCurrent ? 'current-release' : ''}
                />
                <text
                  x={`${(startPos + endPos) / 2}%`}
                  y={yPosition + (isMobile ? 25 : 20)}
                  textAnchor="middle"
                  fill="white"
                  fontSize={isMobile ? "14" : "12"}
                  fontWeight={isMobile ? "600" : "500"}
                >
                  {release.name}
                </text>
              </g>
            );
          })}

          {/* Current date indicator */}
          <g>
            <line
              x1={`${getPosition(currentDate)}%`}
              y1="0"
              x2={`${getPosition(currentDate)}%`}
              y2="100%"
              stroke="#F97316"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <circle
              cx={`${getPosition(currentDate)}%`}
              cy="20"
              r="4"
              fill="#F97316"
            />
            <text
              x={`${getPosition(currentDate)}%`}
              y="40"
              textAnchor="middle"
              fill="#F97316"
              fontSize="12"
              fontWeight="500"
            >
              Today
            </text>
          </g>
        </svg>
      </div>

      {/* Tooltip - unified for desktop and mobile with proper positioning */}
      {hoveredRelease && (
        <div 
          className={isMobile ? "mobile-tooltip-overlay" : ""}
          onClick={isMobile ? handleOverlayClick : undefined}
        >
          <div 
            className="release-tooltip"
            style={isMobile ? {
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2000,
              pointerEvents: 'auto'
            } : {
              position: 'fixed',
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: 'translateX(-50%)'
            }}
            onClick={isMobile ? (e) => e.stopPropagation() : undefined}
          >
            {isMobile && (
              <button 
                className="close-button" 
                onClick={() => setHoveredRelease(null)}
                aria-label="Close"
              >
                ×
              </button>
            )}
            <div className="tooltip-content">
              <h4>{hoveredRelease.name}</h4>
              
              {/* Progress Chart */}
              <div className="progress-chart">
                <svg width="180" height="20">
                  <rect 
                    x="0" 
                    y="0" 
                    width="180" 
                    height="20" 
                    fill="#e9ecef" 
                    rx="4" 
                    ry="4"
                  />
                  <rect 
                    x="0" 
                    y="0" 
                    width={`${(hoveredRelease.completedStories / hoveredRelease.plannedStories) * 180}`} 
                    height="20" 
                    fill="#2e7d32" 
                    rx="4" 
                    ry="4"
                  />
                  <text 
                    x="90" 
                    y="14" 
                    textAnchor="middle" 
                    fill={hoveredRelease.completedStories / hoveredRelease.plannedStories >= 0.5 ? "white" : "#666"}
                    fontSize="12"
                  >
                    {Math.round((hoveredRelease.completedStories / hoveredRelease.plannedStories) * 100)}% Complete
                  </text>
                </svg>
              </div>
              
              {/* Capacity Chart */}
              <div className="capacity-chart">
                <svg width="180" height="20">
                  <rect 
                    x="0" 
                    y="0" 
                    width="180" 
                    height="20" 
                    fill="#e9ecef" 
                    rx="4" 
                    ry="4"
                  />
                  <rect 
                    x="0" 
                    y="0" 
                    width={`${(hoveredRelease.teamCapacity / 100) * 180}`} 
                    height="20" 
                    fill="#0D9488" 
                    rx="4" 
                    ry="4"
                  />
                  <text 
                    x="90" 
                    y="14" 
                    textAnchor="middle" 
                    fill={hoveredRelease.teamCapacity >= 50 ? "white" : "#666"}
                    fontSize="12"
                  >
                    {hoveredRelease.teamCapacity}% Team capacity
                  </text>
                </svg>
              </div>
              
              <div className="tooltip-details">
                <p><strong>Total Sprints</strong> {hoveredRelease.sprints.length}</p>
                <p><strong>Planned Stories</strong> {hoveredRelease.plannedStories}</p>
                <p><strong>Completed Stories</strong> {hoveredRelease.completedStories}</p>
                <p><strong>Spilled over Stories</strong> {hoveredRelease.spilledOverStories}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineChart; 