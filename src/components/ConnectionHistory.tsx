
import type { ConnectionLog } from '../types/connection';

type ConnectionHistoryProps = {
  history: ConnectionLog[];
  isLoading: boolean;
};

function ConnectionHistory({
  history,
  isLoading,
}: ConnectionHistoryProps) {
  return (
    <section className="connection-panel history-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">DATABASE RECORDS</p>
          <h2>Connection History</h2>
        </div>
        <span className="device-id">{history.length} RECORDS</span>
      </div>

      {isLoading && <p>Loading connection history...</p>}

      {!isLoading && history.length === 0 && (
        <p>No connection attempts recorded yet.</p>
      )}

      {!isLoading && history.length > 0 && (
        <div className="history-list">
          {history.map((record) => (
            <div className="history-item" key={record.id}>
              <div>
                <strong>{record.device_name}</strong>
                <p>{record.entered_address}</p>
                <small>
                  {new Date(record.created_at).toLocaleString()}
                </small>
              </div>

              <span className={`history-status ${record.result_status}`}>
                {record.result_status}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ConnectionHistory;
