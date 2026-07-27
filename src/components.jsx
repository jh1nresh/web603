import { useMemo, useState } from "react";

export function Section({ id, eyebrow, title, description, children }) {
  return (
    <section className="lesson" id={id}>
      <div className="lesson-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

export function Notice({ children, tone = "info" }) {
  return <div className={`notice notice-${tone}`}>{children}</div>;
}

export function TodoBoard({
  initialData,
  allowAdd = false,
  showNotes = false,
  allowToggle = false,
  allowSort = false,
  showAll = false,
}) {
  const [lists, setLists] = useState(() => structuredClone(initialData));
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [draft, setDraft] = useState("");
  const [note, setNote] = useState("");
  const [selectedNote, setSelectedNote] = useState("");
  const days = Object.keys(lists);
  const visibleDays = showAll ? days : [selectedDay];

  const addTodo = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    setLists((current) => ({
      ...current,
      [selectedDay]: [
        ...current[selectedDay],
        {
          id: Date.now(),
          text: draft.trim(),
          note: note.trim(),
          done: false,
        },
      ],
    }));
    setDraft("");
    setNote("");
  };

  const toggleTodo = (day, id) => {
    setLists((current) => ({
      ...current,
      [day]: current[day].map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    }));
  };

  const sortList = (day, direction) => {
    setLists((current) => ({
      ...current,
      [day]: [...current[day]].sort((a, b) => {
        const multiplier = direction === "asc" ? 1 : -1;
        return multiplier * a.text.localeCompare(b.text);
      }),
    }));
  };

  return (
    <div className="todo-shell">
      {!showAll && (
        <label className="field">
          Day
          <select
            value={selectedDay}
            onChange={(event) => setSelectedDay(event.target.value)}
          >
            {days.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
        </label>
      )}

      <div className="todo-grid">
        {visibleDays.map((day) => (
          <article className="todo-day" key={day}>
            <div className="todo-day-heading">
              <h3>{day}</h3>
              {allowSort && (
                <div className="button-row">
                  <button type="button" onClick={() => sortList(day, "asc")}>
                    Rush ↑
                  </button>
                  <button type="button" onClick={() => sortList(day, "desc")}>
                    Relax ↓
                  </button>
                </div>
              )}
            </div>
            <ul className="todo-list">
              {lists[day].map((todo) => (
                <li className={todo.done ? "is-done" : ""} key={todo.id}>
                  {allowToggle && (
                    <button
                      className="icon-button"
                      type="button"
                      aria-label={`Toggle ${todo.text}`}
                      onClick={() => toggleTodo(day, todo.id)}
                    >
                      {todo.done ? "✓" : "○"}
                    </button>
                  )}
                  <button
                    className="todo-title"
                    type="button"
                    onClick={() => showNotes && setSelectedNote(todo.note)}
                  >
                    {todo.text}
                  </button>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {showNotes && selectedNote && (
        <div className="note-box" role="status">
          <p>{selectedNote}</p>
          <button type="button" onClick={() => setSelectedNote("")}>
            Done
          </button>
        </div>
      )}

      {allowAdd && (
        <form className="add-form" onSubmit={addTodo}>
          <input
            aria-label="Todo item"
            placeholder="Add todo item"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <input
            aria-label="Todo note"
            placeholder="Add todo note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
          <button type="submit">Add to {selectedDay}</button>
        </form>
      )}
    </div>
  );
}

export function Tabs({ tabs }) {
  const [active, setActive] = useState(tabs[0].id);
  const current = useMemo(
    () => tabs.find((tab) => tab.id === active),
    [active, tabs],
  );
  return (
    <div>
      <div className="tab-list" role="tablist">
        {tabs.map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            className={active === tab.id ? "active" : ""}
            onClick={() => setActive(tab.id)}
            key={tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel">
        {current.content}
      </div>
    </div>
  );
}

