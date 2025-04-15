import React from 'react';
import ReactECharts from 'echarts-for-react';
import './Metrics.css';

const DoraMetrics: React.FC = () => {
  const deploymentOptions = {
    grid: { top: 5, right: 5, bottom: 20, left: 30 },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
      axisLabel: { fontSize: 10 }
    },
    series: [{
      data: [4, 5, 2, 3],
      type: 'bar',
      barWidth: '60%',
      itemStyle: { color: '#069494' }
    }]
  };

  const leadTimeOptions = {
    grid: { top: 5, right: 5, bottom: 20, left: 30 },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
      axisLabel: { fontSize: 10 }
    },
    series: [{
      data: [25.4, 52.1, 21.6, 26.3],
      type: 'line',
      smooth: true,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0, color: '#F97316'
          }, {
            offset: 1, color: 'rgba(6, 148, 148, 0.1)'
          }]
        }
      },
      lineStyle: { color: '#069494' },
      itemStyle: { color: '#069494' }
    }]
  };

  const failureRateOptions = {
    grid: { top: 5, right: 5, bottom: 20, left: 30 },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
      axisLabel: { fontSize: 10 }
    },
    series: [{
      data: [25, 28, 32, 28],
      type: 'line',
      smooth: true,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0, color: '#F97316'
          }, {
            offset: 1, color: 'rgba(6, 148, 148, 0.1)'
          }]
        }
      },
      lineStyle: { color: '#069494' },
      itemStyle: { color: '#069494' }
    }]
  };

  const mttrOptions = {
    grid: { top: 5, right: 5, bottom: 20, left: 30 },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f0f0f0' } },
      axisLabel: { fontSize: 10 }
    },
    series: [{
      data: [12, 11, 9, 10],
      type: 'line',
      smooth: true,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0, color: '#F97316'
          }, {
            offset: 1, color: 'rgba(6, 148, 148, 0.1)'
          }]
        }
      },
      lineStyle: { color: '#069494' },
      itemStyle: { color: '#069494' }
    }]
  };

  return (
    <div className="metric-card dora-metrics">
      <h3>DORA Metrics</h3>
      <div className="dora-grid">
        <div className="dora-item">
          <div className="dora-header">
            <div>
              <div className="metric-label">Average Production Deployments</div>
              <div className="metric-value">3.4</div>
              <div className="metric-unit">/month</div>
            </div>
          </div>
          <ReactECharts option={deploymentOptions} style={{ height: '100px' }} />
        </div>

        <div className="dora-item">
          <div className="dora-header">
            <div>
              <div className="metric-label">Lead time average</div>
              <div className="metric-value">31.3</div>
              <div className="metric-unit">hours</div>
            </div>
          </div>
          <ReactECharts option={leadTimeOptions} style={{ height: '100px' }} />
        </div>

        <div className="dora-item">
          <div className="dora-header">
            <div>
              <div className="metric-label">Change failure rate</div>
              <div className="metric-value">28.5</div>
              <div className="metric-unit">percent</div>
            </div>
          </div>
          <ReactECharts option={failureRateOptions} style={{ height: '100px' }} />
        </div>

        <div className="dora-item">
          <div className="dora-header">
            <div>
              <div className="metric-label">Mean Time to Recover</div>
              <div className="metric-value">10.8</div>
              <div className="metric-unit">days</div>
            </div>
          </div>
          <ReactECharts option={mttrOptions} style={{ height: '100px' }} />
        </div>
      </div>
    </div>
  );
};

export default DoraMetrics; 