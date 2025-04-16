import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import './Metrics.css';

const CodeQuality: React.FC = () => {
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
      startAngle: 180,
      endAngle: 0,
      center: ['50%', isMobile ? '70%' : '75%'],
      radius: isMobile ? '85%' : isLargeScreen ? '95%' : '90%',
      min: 0,
      max: 100,
      splitNumber: isMobile ? 5 : 8,
      axisLine: {
        lineStyle: {
          width: isMobile ? 4 : isLargeScreen ? 8 : 6,
          color: [
            [0.6, '#FF6B6B'],
            [0.8, '#F97316'],
            [1, '#069494']
          ]
        }
      },
      pointer: {
        length: isMobile ? '60%' : '65%',
        width: isMobile ? 4 : isLargeScreen ? 6 : 5,
        offsetCenter: [0, '0%'],
        itemStyle: {
          color: '#069494'
        }
      },
      anchor: {
        show: true,
        showAbove: true,
        size: isMobile ? 6 : isLargeScreen ? 10 : 8,
        itemStyle: {
          color: '#069494'
        }
      },
      axisTick: {
        length: isMobile ? 8 : isLargeScreen ? 15 : 12,
        lineStyle: {
          color: 'inherit',
          width: isMobile ? 1 : 2
        }
      },
      splitLine: {
        length: isMobile ? 14 : isLargeScreen ? 25 : 20,
        lineStyle: {
          color: 'inherit',
          width: isMobile ? 1 : 2
        }
      },
      axisLabel: {
        color: '#666',
        fontSize: isMobile ? 10 : isLargeScreen ? 14 : 12,
        distance: isMobile ? -50 : isLargeScreen ? -65 : -60,
        formatter: function(value: number) {
          if (value === 100) {
            return '100%';
          }
          return value + '';
        }
      },
      title: {
        offsetCenter: [0, isMobile ? '-18%' : '-20%'],
        fontSize: isMobile ? 16 : isLargeScreen ? 22 : 20,
        color: '#111827'
      },
      detail: {
        fontSize: isMobile ? 24 : isLargeScreen ? 36 : 30,
        offsetCenter: [0, '30%'],
        valueAnimation: true,
        formatter: function(value: number) {
          return value + '%';
        },
        color: '#111827'
      },
      data: [{
        value: 85,
        name: ''
      }]
    }]
  };

  const getChartHeight = () => {
    if (isMobile) return '200px';
    if (isLargeScreen) return '300px';
    return '250px';
  };

  return (
    <div className="metric-card">
      <h3>Code Quality</h3>
      <ReactECharts 
        option={gaugeOptions} 
        style={{ height: getChartHeight(), width: '100%' }}
      />
      <div className="metric-trend positive">
        <span>↑</span>
        <span>2% from last month</span>
      </div>
    </div>
  );
};

export default CodeQuality; 