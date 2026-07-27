import { useState } from "react";
import { initialTodos } from "./coursework";
import { Notice, Section, Tabs, TodoBoard } from "./components";

function StateDemo() {
  const [brand, setBrand] = useState("Ford");
  const [model, setModel] = useState("Mustang");
  const [color, setColor] = useState("red");
  const [year, setYear] = useState(1964);
  return (
    <div className="demo-card">
      <h3>State object</h3>
      <p>
        My {brand} {model} is {color}, built in {year}.
      </p>
      <div className="button-row">
        <button type="button" onClick={() => setColor("blue")}>
          Change color
        </button>
        <button type="button" onClick={() => setYear((value) => value + 1)}>
          Next model year
        </button>
        <button
          type="button"
          onClick={() => {
            setBrand("Ford");
            setModel("Mustang");
            setColor("red");
            setYear(1964);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function EventDemo() {
  const [message, setMessage] = useState("Choose an event demo.");
  const tabs = [
    {
      id: "click",
      label: "Functional click",
      content: (
        <button type="button" onClick={() => setMessage("Clicked!!!!!!")}>
          Click the button
        </button>
      ),
    },
    {
      id: "football",
      label: "Class-style event",
      content: (
        <button type="button" onClick={() => setMessage("Great Shot!")}>
          Take the shot
        </button>
      ),
    },
    {
      id: "instance",
      label: "Arrow callback",
      content: (
        <button
          type="button"
          onClick={(event) =>
            setMessage(`this event came from ${event.currentTarget.tagName}`)
          }
        >
          Inspect event
        </button>
      ),
    },
  ];
  return (
    <div className="demo-card">
      <Tabs tabs={tabs} />
      <p className="result">{message}</p>
    </div>
  );
}

export default function Week1() {
  return (
    <>
      <Section
        id="w1d1-homework"
        eyebrow="Week 1 · Day 1 · Homework"
        title="Todo List V1"
        description="Seven daily todo arrays, JSX list rendering, conditional day selection, and Bootstrap-inspired styling."
      >
        <TodoBoard initialData={initialTodos} />
      </Section>

      <Section
        id="w1d2-exercise"
        eyebrow="Week 1 · Day 2 · Exercise"
        title="React state and event handlers"
        description="The five source demos are represented by working state, functional click, class-style handler, and arrow callback examples."
      >
        <div className="two-column">
          <StateDemo />
          <EventDemo />
        </div>
      </Section>

      <Section
        id="w1d2-homework"
        eyebrow="Week 1 · Day 2 · Homework"
        title="Todo List V2"
        description="Todo data is mapped through a reusable component. Clicking an item reveals its note; Done dismisses it."
      >
        <TodoBoard initialData={initialTodos} showNotes />
      </Section>

      <div id="w1d3-review">
        <Notice>
          Week 1 Day 3 is a React review deck. It adds no separate code
          submission beyond the Week 1 implementations above.
        </Notice>
      </div>
    </>
  );
}
