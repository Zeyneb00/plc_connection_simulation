import type { FormEvent } from 'react';
import type { ConnectionResult } from '../types/connection';

type ConnectionPanelProps = {
  ip: string;
  result: ConnectionResult | null;
  isSaving: boolean;
  onIpChange: (value: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
};

function ConnectionPanel({
  ip,
  result,
  isSaving,
  onIpChange,
  onConnect,
  onDisconnect,
}: ConnectionPanelProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onConnect();
  }

  return (
    <section className="connection-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">DEVICE CONFIGURATION</p>
          <h2>PLC Connection</h2>
        </div>

        <span className="device-id">PLC-001</span>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="plc-ip">PLC IP Address</label>

        <input
          id="plc-ip"
          type="text"
          value={ip}
          onChange={(event) => onIpChange(event.target.value)}
          placeholder="e.g. 192.168.1.166"
          autoComplete="off"
          spellCheck={false}
        />

        <div className="button-group">
          <button type="submit" disabled={result?.status === 'connected' || isSaving}>
            {isSaving ? 'Saving...' : 'Connect to PLC'}
          </button>

          <button
            type="button"
            className="disconnect-button"
            onClick={onDisconnect}
            disabled={!result || result.status !== 'connected'}
          >
            Disconnect
          </button>
        </div>
      </form>

      <div className="status-section">
        <p className="eyebrow">CONNECTION STATUS</p>

        {!result && (
          <div className="status-message neutral">
            <span className="status-dot" />
            Not connected
          </div>
        )}

        {result?.status === 'connected' && (
          <div className="status-message success">
            <span className="status-dot" />
            Connected to {result.ip}
          </div>
        )}

        {result?.status === 'unreachable' && (
          <div className="status-message warning">
            <span className="status-dot" />
            Device unreachable: {result.ip}
          </div>
        )}

        {result?.status === 'invalid' && (
          <div className="status-message error">
            <span className="status-dot" />
            {result.message}
          </div>
        )}
      </div>
    </section>
  );
}

export default ConnectionPanel;