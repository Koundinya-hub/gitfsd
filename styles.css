:root {
  --bg: #f6f7ef;
  --card: #ffffffd9;
  --text: #1f2a1f;
  --muted: #5f6e5f;
  --accent: #10634f;
  --border: #dce3d7;
  --danger: #bc3a22;
  --ok-bg: #eaf8f2;
  --ok-text: #10634f;
  --warn-bg: #fff3ef;
  --warn-text: #bc3a22;
  --radius: 16px;
  --shadow: 0 12px 26px rgba(18, 39, 18, 0.1);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  color: var(--text);
  background: radial-gradient(circle at 10% 10%, #fef9e8 0, transparent 30%),
    radial-gradient(circle at 90% 90%, #e5f5ee 0, transparent 28%), var(--bg);
  min-height: 100vh;
  padding: 1.5rem;
  position: relative;
  overflow-x: hidden;
}

.bg-shape {
  position: fixed;
  border-radius: 50%;
  filter: blur(40px);
  z-index: -1;
  opacity: 0.3;
}

.bg-shape-a {
  width: 260px;
  height: 260px;
  background: #f5c58a;
  top: -70px;
  right: -80px;
}

.bg-shape-b {
  width: 300px;
  height: 300px;
  background: #74bea3;
  left: -120px;
  bottom: -140px;
}

h1,
h2,
h3,
p {
  margin: 0;
}

.small {
  font-size: 0.86rem;
  color: var(--muted);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  color: var(--muted);
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.topbar h1 {
  font-family: "Merriweather", serif;
  font-size: clamp(1.2rem, 3vw, 1.95rem);
}

.role-toggle {
  display: flex;
  background: #fff;
  border-radius: 999px;
  padding: 0.3rem;
  border: 1px solid var(--border);
}

.role-toggle button {
  border: 0;
  background: transparent;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
}

.role-toggle button.active {
  background: var(--accent);
  color: #fff;
}

.global-message {
  min-height: 1.5rem;
  margin: 0 0 0.9rem;
  padding: 0.45rem 0.7rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
}

.global-message[data-type="success"] {
  background: var(--ok-bg);
  color: var(--ok-text);
}

.global-message[data-type="error"] {
  background: var(--warn-bg);
  color: var(--warn-text);
}

.layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 1rem;
}

.panel {
  display: none;
  gap: 1rem;
}

.panel.active {
  display: grid;
}

.grid.two {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: var(--shadow);
  backdrop-filter: blur(8px);
}

.profile-card {
  position: sticky;
  top: 1rem;
  align-self: start;
  display: grid;
  gap: 0.75rem;
}

.form-stack {
  display: grid;
  gap: 0.65rem;
}

label {
  font-size: 0.9rem;
  color: var(--muted);
  display: grid;
  gap: 0.25rem;
}

input,
select,
button {
  font: inherit;
}

input,
select {
  border-radius: 12px;
  border: 1px solid var(--border);
  padding: 0.55rem 0.7rem;
  background: #fff;
}

select[multiple] {
  min-height: 95px;
}

button {
  border: 0;
  border-radius: 12px;
  background: var(--accent);
  color: #fff;
  padding: 0.62rem 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.list {
  display: grid;
  gap: 0.6rem;
  margin-top: 0.75rem;
}

.career-item,
.resource-item,
.session-item,
.connection-item {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.75rem;
}

.meta {
  font-size: 0.82rem;
  color: var(--muted);
}

.desc {
  margin-top: 0.35rem;
  color: #2f3a2f;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
}

.card-head input {
  max-width: 220px;
}

.videos {
  display: grid;
  gap: 0.65rem;
  margin-top: 0.8rem;
}

.video-embed {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  border-radius: 12px;
}

.status,
.recommendation-summary {
  margin-top: 0.65rem;
  color: var(--accent);
  font-weight: 600;
}

.delete-btn {
  margin-top: 0.6rem;
  background: #fff5f3;
  color: var(--danger);
  border: 1px solid #f7c2b9;
  padding: 0.35rem 0.6rem;
}

.stats {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stat {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.95rem;
}

.stat h3 {
  color: var(--muted);
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.stat p {
  font-size: 1.3rem;
  font-weight: 700;
}

@media (max-width: 1080px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .profile-card {
    position: static;
  }

  .grid.two,
  .stats {
    grid-template-columns: 1fr;
  }

  .card-head {
    flex-direction: column;
    align-items: stretch;
  }

  .card-head input {
    max-width: none;
  }
}
