import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import './Metrics.css';

const QualityMetrics: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const qualityData = {
    weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    bugs: [24, 18, 16, 12, 10, 8, 6, 5],
    criticalBugs: [8, 5, 3, 2, 1, 1, 0, 0],
    peerReviewTime: [4.5, 4.8, 5.2, 5.5, 6.0, 6.2, 6.5, 6.8]
  };

  const barOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Total Bugs', 'Critical Bugs'],
      textStyle: { fontSize: isMobile ? 10 : 12 },
      top: 0,
      itemWidth: isMobile ? 12 : 16,
      itemHeight: isMobile ? 8 : 10
    },
    grid: {
      left: isMobile ? '3%' : '5%',
      right: isMobile ? '5%' : '10%',
      bottom: '8%',
      top: isMobile ? '20%' : '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: qualityData.weeks,
      axisLabel: {
        fontSize: isMobile ? 10 : 12,
        interval: isMobile ? 'auto' : 0
      }
    },
    yAxis: {
      type: 'value',
      name: 'Bug Count',
      nameTextStyle: {
        fontSize: isMobile ? 10 : 12
      },
      axisLabel: {
        fontSize: isMobile ? 10 : 12
      }
    },
    series: [
      {
        name: 'Total Bugs',
        type: 'bar',
        data: qualityData.bugs,
        itemStyle: {
          color: '#069494'
        }
      },
      {
        name: 'Critical Bugs',
        type: 'bar',
        data: qualityData.criticalBugs,
        itemStyle: {
          color: '#F97316'
        }
      }
    ]
  };

  const lineOptions = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: isMobile ? '3%' : '5%',
      right: isMobile ? '5%' : '10%',
      bottom: '8%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: qualityData.weeks,
      axisLabel: {
        fontSize: isMobile ? 10 : 12
      }
    },
    yAxis: {
      type: 'value',
      name: 'Hours',
      nameTextStyle: {
        fontSize: isMobile ? 10 : 12
      },
      axisLabel: {
        formatter: '{value} h',
        fontSize: isMobile ? 10 : 12
      }
    },
    series: [{
      data: qualityData.peerReviewTime,
      type: 'line',
      name: 'Peer Review Time',
      smooth: true,
      lineStyle: {
        color: '#36C2C2',
        width: 3
      },
      itemStyle: {
        color: '#36C2C2'
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
            color: 'rgba(54, 194, 194, 0.3)'
          }, {
            offset: 1,
            color: 'rgba(54, 194, 194, 0.0)'
          }]
        }
      }
    }]
  };

  const metricCards = [
    { label: 'Bugs Fixed', value: '89', trend: 'up', trendValue: '24%', color: '#069494' },
    { label: 'Review Approval', value: '92%', trend: 'up', trendValue: '5%', color: '#36C2C2' },
    { label: 'Zero-Bug Sprints', value: '2', trend: 'up', trendValue: '2', color: '#F97316' }
  ];

  return (
    <div className="metric-card">
      <h3>Quality Metrics</h3>
      
      <div className="metrics-summary" style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        gap: isMobile ? '15px' : '20px',
        marginBottom: '20px'
      }}>
        {metricCards.map((metric, index) => (
          <div key={index} className="quality-metric-card" style={{
            flex: 1,
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: 'rgba(240, 240, 240, 0.5)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div className="metric-label" style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
              {metric.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="metric-value" style={{ fontSize: '22px', fontWeight: 'bold', color: metric.color }}>
                {metric.value}
              </span>
              <span className={`trend-arrow ${metric.trend}`} style={{ fontSize: '14px' }}>
                ↑ {metric.trendValue}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
        gap: '20px',
        height: isMobile ? 'auto' : '280px'
      }}>
        <div style={{ height: isMobile ? '280px' : '100%' }}>
          <h4 style={{ margin: '5px 0', fontSize: isMobile ? '14px' : '16px', color: '#444' }}>Bug Trend</h4>
          <ReactECharts 
            option={barOptions} 
            style={{ height: '90%', width: '100%' }} 
          />
        </div>
        <div style={{ height: isMobile ? '280px' : '100%' }}>
          <h4 style={{ margin: '5px 0', fontSize: isMobile ? '14px' : '16px', color: '#444' }}>Peer Review Time</h4>
          <ReactECharts 
            option={lineOptions} 
            style={{ height: '90%', width: '100%' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default QualityMetrics; 