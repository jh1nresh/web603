import { useEffect, useState } from "react";
import { coursework } from "./coursework";
import Week1 from "./Week1";
import Week2 from "./Week2";
import Week3 from "./Week3";
import Week4 from "./Week4";

const weekComponents = {
  1: Week1,
  2: Week2,
  3: Week3,
  4: Week4,
};

function readWeekFromHash() {
  const match = window.location.hash.match(/^#week-(\d)$/);
  return match ? Number(match[1]) : 1;
}

export default function App() {
  const [activeWeek, setActiveWeek] = useState(readWeekFromHash);
  const Week = weekComponents[activeWeek];

  useEffect(() => {
    const onHashChange = () => setActiveWeek(readWeekFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const selectWeek = (week) => {
    window.location.hash = `week-${week}`;
    setActiveWeek(week);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#week-1" onClick={() => selectWeek(1)}>
          <span>W</span>
          <div>
            <strong>WEB603</strong>
            <small>Module 5</small>
          </div>
        </a>
        <nav aria-label="Course weeks">
          {coursework.map((group) => (
            <button
              className={activeWeek === group.week ? "active" : ""}
              type="button"
              onClick={() => selectWeek(group.week)}
              key={group.week}
            >
              <span>0{group.week}</span>
              Week {group.week}
            </button>
          ))}
        </nav>
        <p className="sidebar-note">
          Local coursework recovery
          <br />
          Summer 2026
        </p>
      </aside>

      <main>
        <header className="hero">
          <div>
            <p className="eyebrow">Westcliff University · WEB603</p>
            <h1>
              Module 5
              <br />
              <em>coursework lab</em>
            </h1>
          </div>
          <div className="week-index">
            <p>Week {activeWeek} deliverables</p>
            <ol>
              {coursework
                .find((group) => group.week === activeWeek)
                .items.map(([id, label, detail]) => (
                  <li key={id}>
                    <a href={`#${id}`}>{label}</a>
                    <span>{detail}</span>
                  </li>
                ))}
            </ol>
          </div>
        </header>
        <Week />
        <footer>
          <p>WEB603 · Module 5 · Local verified source</p>
          <a href="#top">Back to top ↑</a>
        </footer>
      </main>
    </div>
  );
}

