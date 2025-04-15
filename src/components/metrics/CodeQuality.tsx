import React from 'react';
import ReactECharts from 'echarts-for-react';
import './Metrics.css';

const CodeQuality: React.FC = () => {
  const gaugeOptions = {
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      center: ['50%', '75%'],
      radius: '90%',
      min: 0,
      max: 100,
      splitNumber: 8,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.6, '#FF6B6B'],
            [0.8, '#F97316'],
            [1, '#069494']
          ]
        }
      },
      pointer: {
        icon: 'path://M2.9,0.7L9,6.1L15.1,0.7',
        length: '55%',
        width: 8,
        offsetCenter: [0, '2%'],
        itemStyle: {
          color: '#069494',
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 4
        }
      },
      anchor: {
        show: true,
        size: 5,
        showAbove: true,
        itemStyle: {
          color: '#069494',
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 4
        }
      },
      axisTick: {
        length: 12,
        lineStyle: {
          color: 'inherit',
          width: 2
        }
      },
      splitLine: {
        length: 20,
        lineStyle: {
          color: 'inherit',
          width: 2
        }
      },
      axisLabel: {
        color: '#666',
        fontSize: 12,
        distance: -60,
        formatter: function(value: number) {
          if (value === 100) {
            return '100%';
          }
          return value + '';
        }
      },
      title: {
        offsetCenter: [0, '-20%'],
        fontSize: 20,
        color: '#111827'
      },
      detail: {
        fontSize: 30,
        offsetCenter: [0, '0%'],
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

  return (
    <div className="metric-card">
      <h3>Code Quality</h3>
      <ReactECharts 
        option={gaugeOptions} 
        style={{ height: '250px' }}
      />
      <div className="metric-trend positive">
        <span>↑</span>
        <span>2% from last month</span>
      </div>
    </div>
  );
};

export default CodeQuality; 