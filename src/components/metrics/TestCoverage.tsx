import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import './Metrics.css';

const TestCoverage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1400);
  
  // Check if we're on mobile or large screen
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 480);
      setIsLargeScreen(width >= 1400);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        fontSize: isMobile ? 28 : isLargeScreen ? 40 : 36,
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

  const getChartHeight = () => {
    if (isMobile) return '180px';
    if (isLargeScreen) return '300px';
    return '250px';
  };

  return (
    <div className="metric-card">
      <h3>Test Coverage</h3>
      <ReactECharts 
        option={gaugeOptions} 
        style={{ height: getChartHeight(), width: '100%' }}
      />
      <div className="metric-trend positive">
      </div>
    </div>
  );
};

export default TestCoverage; 