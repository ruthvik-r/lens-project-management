import React from 'react';
import ReactECharts from 'echarts-for-react';
import './Metrics.css';

const TechnicalDebt: React.FC = () => {
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
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: '#666',
        fontSize: 12
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
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
        color: '#666'
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
        color: '#666'
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
        color: '#666'
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
        symbolSize: 8,
        lineStyle: {
          width: 3,
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
        symbolSize: 8,
        lineStyle: {
          width: 3,
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

  return (
    <div className="metric-card">
      <h3>Technical Debt</h3>
      <ReactECharts 
        option={chartOptions} 
        style={{ height: '250px' }}
      />
      <div className="metric-trend negative">
      </div>
    </div>
  );
};

export default TechnicalDebt; 