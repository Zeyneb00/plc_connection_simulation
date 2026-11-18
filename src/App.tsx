
import { useEffect, useState } from 'react';

import ConnectionPanel from './components/ConnectionPanel';
import ConnectionHistory from './components/ConnectionHistory';

import { connectToPLC } from './logic/connection';

import {
  saveConnectionAttempt,
  getConnectionHistory,
} from './services/connectionLog';

import type {
  ConnectionResult,
  ConnectionLog,
} from './types/connection';

import './App.css';

function App() {
  const [ip, setIp] = useState('192.168.1.166');

  const [result, setResult] = useState<ConnectionResult | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  const [history, setHistory] = useState<ConnectionLog[]>([]);

  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  const [databaseError, setDatabaseError] = useState<string | null>(null);

  // Load saved records when the application starts.
  useEffect(() => {
    async function loadHistory() {
      try {
        const records = await getConnectionHistory();
        setHistory(records);
      } catch (error) {
        console.error('Could not load history:', error);
        setDatabaseError('Could not load connection history.');
      } finally {
        setIsLoadingHistory(false);
      }
    }

    void loadHistory();
  }, []);

  // Simulate a PLC connection and save its result.
  async function handleConnect() {
    const connectionResult = connectToPLC(ip);

    // Update the PLC result immediately.
    setResult(connectionResult);

    // Clear any previous database error.
    setDatabaseError(null);

    setIsSaving(true);

    try {
  await saveConnectionAttempt(ip, connectionResult.status);

  try {
    const records = await getConnectionHistory();
    setHistory(records);
  } catch (error) {
    console.error('History refresh failed:', error);
    setDatabaseError(
      'Attempt saved, but history could not be refreshed.'
    );
  }
} catch (error) {
  console.error('Database insert failed:', error);
  setDatabaseError('The connection result could not be saved.');
} finally {
  setIsSaving(false);
}
  }

  function handleDisconnect() {
    setResult(null);
  }

  return (
    <main className="app">
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">P</div>
          <div>
            <h1>PLC Control Center</h1>
            <p>Industrial Connection Monitor</p>
          </div>
        </div>

        <span className="environment-label">
          SIMULATION ENVIRONMENT
        </span>
      </header>

      <section className="welcome-section">
        <p className="eyebrow">SYSTEM OVERVIEW</p>
        <h2>Device Management</h2>
        <p>
          Configure your PLC endpoint and monitor its connection status.
        </p>
      </section>

      <ConnectionPanel
        ip={ip}
        result={result}
        isSaving={isSaving}
        onIpChange={setIp}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      {databaseError && (
        <p className="database-error">{databaseError}</p>
      )}

      <ConnectionHistory
        history={history}
        isLoading={isLoadingHistory}
      />

      <footer>
        PLC Connection Simulator · Development Build
      </footer>
    </main>
  );
}

export default App;
