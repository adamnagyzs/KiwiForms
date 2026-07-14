import { useEffect, useState } from "react";
import type { HealthCheckResponse } from "@kiwiforms/types";
import "./App.css";

function App() {
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<HealthCheckResponse>;
      })
      .then((health) => setHealth(health))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Kiwiforms</h1>
        <p>Turborepo monorepo — React + NestJS + shared types</p>
      </header>

      <main className="card">
        <h2>API Health Check</h2>
        {loading && <p className="muted">Checking backend…</p>}
        {error && <p className="error">Error: {error}</p>}
        {health && (
          <dl className="health">
            <div>
              <dt>Status</dt>
              <dd className={health.status}>{health.status}</dd>
            </div>
            <div>
              <dt>Timestamp</dt>
              <dd>{new Date(health.timestamp).toLocaleString()}</dd>
            </div>
          </dl>
        )}
      </main>
    </div>
  );
}

export default App;
