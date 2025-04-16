import React, { useState } from 'react';
import CodeQuality from './metrics/CodeQuality';
import TestCoverage from './metrics/TestCoverage';
import TechnicalDebt from './metrics/TechnicalDebt';
import DoraMetrics from './metrics/DoraMetrics';
import ProductPosture from './metrics/ProductPosture';
import OpsCalendar from './metrics/OpsCalendar';
import './ProductHealth.css';

const ProductHealth: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('apollo');

  return (
    <div className="product-health-container">
      <div className="health-header">
        <h2>Product Health Dashboard</h2>
        <p className="subtitle">Monitor and track the overall health of your product</p>
      </div>

      <div className="product-selector">
        <label htmlFor="product">Product</label>
        <select 
          id="product" 
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="product-select"
        >
          <option value="apollo">Apollo</option>
          <option value="artemis" disabled>Artemis</option>
          <option value="athena" disabled>Athena</option>
          <option value="hermes" disabled>Hermes</option>
        </select>
      </div>

      <div className="health-content">
        <div className="health-metrics">
          <CodeQuality />
          <TestCoverage />
          <TechnicalDebt />
          <ProductPosture />
          <DoraMetrics />
          <OpsCalendar />
        </div>
      </div>
    </div>
  );
};

export default ProductHealth; 