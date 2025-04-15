import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import './Metrics.css';

const TechnicalDebt: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1400);
  
  // Check if we're on mobile, small screen, or large screen
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 480);
      setIsSmallScreen(width <= 768);
      setIsLargeScreen(width >= 1400);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chartOptions = {
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any) {
        let result = params[0].axisValue + '<br/>';
        params.forEach((param: any) => {
          const value = param.seriesName === 'Lines of Code' ? 
            param.value.toLocaleString() : 
            param.value + '%';
          result += `${param.marker} ${param.seriesName}: ${value}<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['Technical Debt', 'Lines of Code'],
      bottom: 0,
      icon: 'circle',
      itemWidth: isMobile ? 6 : 8,
      itemHeight: isMobile ? 6 : 8,
      textStyle: {
        color: '#666',
        fontSize: isMobile ? 10 : 12
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: isMobile ? '20%' : '15%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr'],
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#666',
        fontSize: isMobile ? 10 : 12
      }
    },
    yAxis: [{
      type: 'value',
      name: 'Technical Debt',
      position: 'left',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#069494'
        }
      },
      axisLabel: {
        formatter: '{value}%',
        color: '#666',
        fontSize: isMobile ? 10 : 12
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0'
        }
      }
    },
    {
      type: 'value',
      name: 'Lines of Code',
      position: 'right',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#F97316'
        }
      },
      axisLabel: {
        formatter: '{value}',
        color: '#666',
        fontSize: isMobile ? 10 : 12
      },
      splitLine: {
        show: false
      }
    }],
    series: [
      {
        name: 'Technical Debt',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: isMobile ? 6 : 8,
        lineStyle: {
          width: isMobile ? 2 : 3,
          color: '#069494'
        },
        itemStyle: {
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
        data: [2, 3.4, 5.4, 6.2]
      },
      {
        name: 'Lines of Code',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: isMobile ? 6 : 8,
        lineStyle: {
          width: isMobile ? 2 : 3,
          color: '#F97316'
        },
        itemStyle: {
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
        data: [1205, 1371, 2337, 2456]
      }
    ]
  };

  const getChartHeight = () => {
    if (isMobile) return '180px';
    if (isSmallScreen) return '220px';
    if (isLargeScreen) return '300px';
    return '250px';
  };

  return (
    <div className="metric-card">
      <h3>Technical Debt</h3>
      <ReactECharts 
        option={chartOptions} 
        style={{ height: getChartHeight(), width: '100%' }}
      />
      <div className="metric-trend negative">
      </div>
    </div>
  );
};

export default TechnicalDebt; 