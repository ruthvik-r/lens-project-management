import React from 'react';
import ReactECharts from 'echarts-for-react';
import './Metrics.css';

const ProductPosture: React.FC = () => {
  const radarOptions = {
    legend: {
      data: ['Apollo', 'Org Benchmark'],
      bottom: -5,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: '#666',
        fontSize: 12
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
      radius: '70%',
      center: ['50%', '50%'],
      splitNumber: 4,
      axisName: {
        color: '#666',
        fontSize: 13,
        padding: [0, 15]
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
        symbolSize: 8,
        lineStyle: {
          width: 3,
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
        symbolSize: 8,
        lineStyle: {
          width: 3,
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

  return (
    <div className="metric-card product-posture">
      <h3>Product Posture</h3>
      <ReactECharts 
        option={radarOptions} 
        style={{ height: '300px' }}
      />
      <div className="metric-trend positive">
      </div>
    </div>
  );
};

export default ProductPosture; 