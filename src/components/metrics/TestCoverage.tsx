import React from 'react';
import ReactECharts from 'echarts-for-react';
import './Metrics.css';

const TestCoverage: React.FC = () => {
  const gaugeOptions = {
    series: [{
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#069494'
            }, {
              offset: 1,
              color: '#06B6B6'
            }]
          }
        }
      },
      axisLine: {
        lineStyle: {
          width: 18,
          color: [[1, '#f0f0f0']]
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        offsetCenter: [0, 0],
        valueAnimation: true,
        fontSize: 36,
        fontWeight: 'bold',
        formatter: '{value}%',
        color: '#111827'
      },
      data: [{
        value: 78,
        name: 'Test Coverage'
      }]
    }]
  };

  return (
    <div className="metric-card">
      <h3>Test Coverage</h3>
      <ReactECharts 
        option={gaugeOptions} 
        style={{ height: '250px' }}
      />
      <div className="metric-trend positive">
      </div>
    </div>
  );
};

export default TestCoverage; 