import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import './Metrics.css';

const ProductPosture: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  
  // Check if we're on mobile or small screen
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 480);
      setIsSmallScreen(width <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const radarOptions = {
    legend: {
      data: ['Apollo', 'Org Benchmark'],
      bottom: isMobile ? 0 : -5,
      icon: 'circle',
      itemWidth: isMobile ? 6 : 8,
      itemHeight: isMobile ? 6 : 8,
      textStyle: {
        color: '#666',
        fontSize: isMobile ? 10 : 12
      }
    },
    radar: {
      indicator: [
        { name: 'Security', max: 100 },
        { name: 'Performance', max: 100 },
        { name: 'Org Compliance', max: 100 },
        { name: 'Agile Maturity', max: 100 },
        { name: 'Reliability', max: 100 },
        { name: 'Audit', max: 100 }
      ],
      radius: isMobile ? '55%' : isSmallScreen ? '65%' : '70%',
      center: ['50%', '50%'],
      splitNumber: isMobile ? 3 : 4,
      axisName: {
        color: '#666',
        fontSize: isMobile ? 11 : 13,
        padding: isMobile ? [0, 10] : [0, 15]
      },
      splitArea: {
        areaStyle: {
          color: ['#f8f9fa', '#f3f4f6', '#e9ecef', '#dee2e6']
        }
      },
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      }
    },
    series: [{
      name: 'Apollo',
      type: 'radar',
      data: [{
        value: [98, 92, 88, 83, 58, 87],
        name: 'Apollo',
        symbol: 'circle',
        symbolSize: isMobile ? 6 : 8,
        lineStyle: {
          width: isMobile ? 2 : 3,
          color: '#069494'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(6, 148, 148, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(6, 148, 148, 0.1)'
            }]
          }
        },
        itemStyle: {
          color: '#069494'
        }
      }, {
        value: [85, 80, 100, 87, 93, 90],
        name: 'Org Benchmark',
        symbol: 'circle',
        symbolSize: isMobile ? 6 : 8,
        lineStyle: {
          width: isMobile ? 2 : 3,
          color: '#F97316'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(249, 115, 22, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(249, 115, 22, 0.1)'
            }]
          }
        },
        itemStyle: {
          color: '#F97316'
        }
      }]
    }]
  };

  const getChartHeight = () => {
    if (isMobile) return '240px';
    if (isSmallScreen) return '270px';
    return '300px';
  };

  return (
    <div className="metric-card product-posture">
      <h3>Product Posture</h3>
      <ReactECharts 
        option={radarOptions} 
        style={{ height: getChartHeight(), width: '100%' }}
      />
      <div className="metric-trend positive">
      </div>
    </div>
  );
};

export default ProductPosture; 