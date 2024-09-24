"use client"
import { useState } from 'react';

const FetchTableData: React.FC = () => {
  const [tableName, setTableName] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  const fetchData = async () => {
    if (!tableName) {
      setError('Please enter a table name');
      return;
    }

    try {
      const response = await fetch(`/api/connectDatabase?tableData=${tableName}`);
      const result = await response.json();

      if (result.success) {
        setData(result.data); // Set the returned rows
        setError(''); // Clear any previous error
      } else {
        setError(result.message);
        setData([]); // Clear data if there's an error
      }
    } catch (err) {
      setError('Failed to fetch data');
      setData([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
        placeholder="Enter table name"
      />
      <button onClick={fetchData}>Fetch Data</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Table Data:</h3>
      <ul>
        {data.map((row, index) => (
          <li key={index}>{JSON.stringify(row)}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchTableData;
