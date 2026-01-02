import React from "react";
import { useLoaderData, Await, Link } from "react-router";

export default function Single() {
  let { id, data, kind } = useLoaderData();
  const url = `/menu/${kind}`;
  
  const Data = ({ data }) => {
    // Filter out null/undefined values and format the data
    const formatValue = (value) => {
      if (value === null || value === undefined) return 'N/A';
      if (typeof value === 'number' && value % 1 !== 0) {
        return `$${value.toFixed(2)}`;
      }
      if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
      }
      if (typeof value === 'string' && value.includes('T')) {
        // Handle datetime strings
        const date = new Date(value);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      }
      return value.toString();
    };

    const formatLabel = (key) => {
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace(/_/g, ' ')
        .trim();
    };

    // Get all key-value pairs, excluding the id since it's already displayed in header
    const dataEntries = Object.entries(data).filter(([key]) => key !== 'id');

    return (
      <div className="single-item-card">
        <div className="single-item-header">
          <h3>{data.name || 'Unknown Item'}</h3>
          <span className="item-id">#{data.id}</span>
        </div>
        
        <div className="single-item-content">
          {dataEntries.map(([key, value]) => (
            <div key={key} className="item-field">
              <span className="field-label">{formatLabel(key)}</span>
              <span className="field-value">{formatValue(value)}</span>
            </div>
          ))}
        </div>
        
        <div className="single-item-footer">
          <Link to={url} className="back-button">
            ← Back to {kind === 'coffee' ? 'Coffee' : 'Drinks'} Menu
          </Link>
        </div>
      </div>
    );
  };

  const Loading = () => {
    return (
      <div className="single-item-card">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading drink details...</p>
        </div>
      </div>
    );
  };

  const ErrorElement = () => {
    return (
      <div className="single-item-card">
        <div className="error-content">
          <h3>⚠️ Error</h3>
          <p>Couldn't load the drink data. Please try again.</p>
          <Link to={url} className="back-button">
            ← Back to {kind === 'coffee' ? 'Coffee' : 'Drinks'} Menu
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="single-container">
        <h1 className="page-title">
          {kind === 'coffee' ? 'Coffee' : 'Drink'} Details
        </h1>
        <React.Suspense fallback={<Loading />}>
          <Await
            resolve={data}
            errorElement={<ErrorElement />}
            children={(resolvedData) => <Data data={resolvedData} />}
          />
        </React.Suspense>
      </div>
    </>
  );
}
