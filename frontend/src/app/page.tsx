'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [tab, setTab] = useState('doctors');
  const [data, setData] = useState<any[]>([]);

  const fetchData = async (endpoint: string) => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await axios.get(`http://localhost:3000/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch {
      setData([]);
    }
  };

  useEffect(() => {
    fetchData(tab);
  }, [tab]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="flex space-x-4 mb-6">
        {['doctors', 'patients', 'appointments'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded ${tab === t ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">{tab.toUpperCase()}</h2>
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
