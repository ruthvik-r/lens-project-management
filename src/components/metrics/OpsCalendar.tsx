import React from 'react';
import ReactECharts from 'echarts-for-react';
import './Metrics.css';

type Status = {
  [key: number]: string;
};

interface TooltipParams {
  data: [string, number];
}

const OpsCalendar: React.FC = () => {
  // Generate data for April 2024
  const generateData = () => {
    const data: [string, number][] = [];
    // April has 30 days
    for (let i = 1; i <= 30; i++) {
      const date = `2024-04-${i.toString().padStart(2, '0')}`;
      // Randomly assign statuses for demonstration
      // 0: Normal, 1: Deployment, 2: Downtime, 3: Unavailability
      let value: number;
      if (i === 5 || i === 15 || i === 16) {
        value = 1; // Deployments
      } else if (i === 10 || i == 12 || i == 4) {
        value = 2; // Downtime
      } else if (i === 7) {
        value = 3; // Unavailability
      } else {
        value = 0; // Normal days
      }
      data.push([date, value]);
    }
    return data;
  };

  const chartOptions = {
    tooltip: {
      formatter: function(params: TooltipParams) {
        const status: Status = {
          0: 'Normal',
          1: 'Deployment',
          2: 'Downtime',
          3: 'Unavailable'
        };
        const date = new Date(params.data[0]);
        return `${date.getDate()} April: ${status[params.data[1]]}`;
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: 3,
      inRange: {
        color: ['#ffffff', '#069494', '#dc2626', '#F97316']
      }
    },
    calendar: {
      top: 25,
      left: 30,
      right: 30,
      cellSize: ['auto', 25],
      range: '2024-04',
      itemStyle: {
        borderWidth: 1,
        borderColor: '#e5e7eb'
      },
      yearLabel: { show: false },
      dayLabel: {
        firstDay: 1,
        nameMap: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        color: '#666'
      },
      monthLabel: {
        show: true,
        color: '#666'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#e5e7eb',
          width: 1
        }
      }
    },
    series: [{
      type: 'scatter',
      coordinateSystem: 'calendar',
      symbolSize: function(val: any) {
        return val[1] === 0 ? 0 : 12;
      },
      symbol: function(val: any, params: any) {
        // Different symbols for different statuses
        switch(params.data[1]) {
          case 1: return 'triangle'; // Triangle for Deployment
          case 2: return 'circle'; // Circle for Downtime
          case 3: return 'rect'; // Square for Unavailability
          default: return 'circle';
        }
      },
      data: generateData()
    }]
  };

  return (
    <div className="metric-card ops-calendar">
      <h3>Ops Calendar</h3>
      <div className="calendar-container">
        <ReactECharts 
          option={chartOptions} 
          style={{ height: '280px' }}
        />
        <div className="calendar-legend">
          <div className="legend-item">
            <span className="legend-symbol deployment"></span>
            <span>Deployment</span>
          </div>
          <div className="legend-item">
            <span className="legend-symbol downtime"></span>
            <span>Downtime</span>
          </div>
          <div className="legend-item">
            <span className="legend-symbol unavailable"></span>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpsCalendar; 