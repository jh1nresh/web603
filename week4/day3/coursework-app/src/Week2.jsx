import { useRef, useState } from "react";
import { initialTodos } from "./coursework";
import { Notice, Section, Tabs, TodoBoard } from "./components";

function FormsDemo() {
  const [controlled, setControlled] = useState("");
  const uncontrolled = useRef(null);
  const fileInput = useRef(null);
  const [message, setMessage] = useState("Submit a form.");
  return (
    <div className="three-column">
      <form
        className="demo-card"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage(`Controlled: ${controlled || "empty"}`);
        }}
      >
        <h3>Controlled</h3>
        <input
          aria-label="Controlled name"
          value={controlled}
          onChange={(event) => setControlled(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <form
        className="demo-card"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage(`Uncontrolled: ${uncontrolled.current.value || "empty"}`);
        }}
      >
        <h3>Uncontrolled ref</h3>
        <input aria-label="Uncontrolled name" ref={uncontrolled} />
        <button type="submit">Submit</button>
      </form>
      <form
        className="demo-card"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage(
            fileInput.current.files[0]
              ? `Selected file: ${fileInput.current.files[0].name}`
              : "No file selected",
          );
        }}
      >
        <h3>File input</h3>
        <input aria-label="Upload file" type="file" ref={fileInput} />
        <button type="submit">Inspect</button>
      </form>
      <p className="result span-all">{message}</p>
    </div>
  );
}

function RouterDemo() {
  const [route, setRoute] = useState("/");
  const tabs = [
    { path: "/", label: "Home", content: "Welcome home." },
    { path: "/about", label: "About", content: "This is a client-side route." },
    {
      path: "/topics/cats",
      label: "Cats",
      content: "Requested topic ID: cats",
    },
    {
      path: "/topics/dogs",
      label: "Dogs",
      content: "Requested topic ID: dogs",
    },
  ];
  const active = tabs.find((tab) => tab.path === route);
  return (
    <div className="router-demo">
      <nav aria-label="Demo routes">
        {tabs.map((tab) => (
          <button
            className={route === tab.path ? "active" : ""}
            type="button"
            onClick={() => setRoute(tab.path)}
            key={tab.path}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="route-screen">
        <code>{route}</code>
        <h3>{active.content}</h3>
      </div>
    </div>
  );
}

export default function Week2() {
  return (
    <>
      <Section
        id="w2d1-exercise"
        eyebrow="Week 2 · Day 1 · Exercise"
        title="React forms"
        description="Controlled input, uncontrolled ref, and file input behaviors are available side by side."
      >
        <FormsDemo />
      </Section>

      <Section
        id="w2d1-homework"
        eyebrow="Week 2 · Day 1 Homework / Day 2 Exercise"
        title="React Router patterns"
        description="The LMS PDFs for these two links contain the same router lesson. This implementation covers navigation, nested topics, and a topic parameter."
      >
        <span id="w2d2-exercise" className="anchor-target" />
        <Notice>
          Shared implementation: the two supplied PDFs have identical page counts,
          file size, and extracted lesson text.
        </Notice>
        <RouterDemo />
      </Section>

      <Section
        id="w2d2-homework"
        eyebrow="Week 2 · Day 2 · Homework"
        title="Todo List V4"
        description="External todo data, extracted components, controlled Add Todo form, completion toggles, and an All Todos route."
      >
        <Tabs
          tabs={[
            {
              id: "today",
              label: "Today's list",
              content: (
                <TodoBoard
                  initialData={initialTodos}
                  allowAdd
                  allowToggle
                  showNotes
                />
              ),
            },
            {
              id: "all",
              label: "All lists",
              content: (
                <TodoBoard
                  initialData={initialTodos}
                  allowToggle
                  showNotes
                  showAll
                />
              ),
            },
          ]}
        />
      </Section>

      <div id="w2d3-review">
        <Notice>
          Week 2 Day 3 is a forms, routing, and single-page application
          review. It adds no separate code submission.
        </Notice>
      </div>
    </>
  );
}
