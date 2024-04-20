import React, { useEffect, useState } from 'react';
import './App.css';
import { calculateStats } from './utils';
import FlavanoidsTable from './FlavanoidsTable';
import GammaTable from './GammaTable';

const App: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // Calculate statistics
    const statsResult = calculateStats();
    setStats(statsResult);
  }, []);

  return (
    <div className="App">
      <h1>Wine Statistics</h1>
      {stats && (
        <>
          <FlavanoidsTable stats={stats} />
          <GammaTable stats={stats} />
        </>
      )}
    </div>
  );
};

export default App;

