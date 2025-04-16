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

  // Get responsive values based on screen size
  const getResponsiveValue = (mobileValue: number | string, regularValue: number | string, largeValue: number | string) => {
    if (isMobile) return mobileValue;
    if (isLargeScreen) return largeValue;
    return regularValue;
  };

  const gaugeOptions = {
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      center: ['50%', isMobile ? '70%' : '75%'],
      radius: getResponsiveValue('85%', '90%', '95%'),
      min: 0,
      max: 100,
      splitNumber: isMobile ? 5 : 8,
      axisLine: {
        lineStyle: {
          width: getResponsiveValue(4, 6, 8),
          color: [
            [0.6, '#FF6B6B'],
            [0.8, '#F97316'],
            [1, '#069494']
          ]
        }
      },
      pointer: {
        length: isMobile ? '60%' : '65%',
        width: getResponsiveValue(4, 5, 6),
        offsetCenter: [0, '0%'],
        itemStyle: {
          color: '#069494'
        }
      },
      anchor: {
        show: true,
        showAbove: true,
        size: getResponsiveValue(6, 8, 10),
        itemStyle: {
          color: '#069494'
        }
      },
      axisTick: {
        length: getResponsiveValue(8, 12, 15),
        lineStyle: {
          color: 'inherit',
          width: isMobile ? 1 : 2
        }
      },
      splitLine: {
        length: getResponsiveValue(14, 20, 25),
        lineStyle: {
          color: 'inherit',
          width: isMobile ? 1 : 2
        }
      },
      axisLabel: {
        color: '#666',
        fontSize: getResponsiveValue(10, 12, 14),
        distance: getResponsiveValue(-50, -60, -65),
        formatter: function(value: number) {
          if (value === 100) {
            return '100%';
          }
          return value + '';
        }
      },
      title: {
        offsetCenter: [0, isMobile ? '-18%' : '-20%'],
        fontSize: getResponsiveValue(16, 20, 22),
        color: '#111827'
      },
      detail: {
        fontSize: getResponsiveValue(24, 30, 36),
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