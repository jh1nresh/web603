import { useMemo, useState } from "react";
import { initialTodos } from "./coursework";
import { factorial, kelvinToFahrenheit, quickSort } from "./lib";
import { Notice, Section, TodoBoard } from "./components";

function DomDemo() {
  const [heading, setHeading] = useState(false);
  const [textColor, setTextColor] = useState("black");
  const [background, setBackground] = useState("white");
  const [linkColor, setLinkColor] = useState("blue");
  const [clicked, setClicked] = useState("");
  return (
    <div className="dom-demo" style={{ color: textColor, background }}>
      <div className="button-row">
        <button type="button" onClick={() => setHeading(true)}>
          appendChild heading
        </button>
        <label>
          Text
          <select
            value={textColor}
            onChange={(event) => setTextColor(event.target.value)}
          >
            <option>black</option>
            <option>red</option>
          </select>
        </label>
        <label>
          Background
          <select
            value={background}
            onChange={(event) => setBackground(event.target.value)}
          >
            <option value="white">white</option>
            <option value="lightgrey">gray</option>
          </select>
        </label>
        <label>
          Link
          <select
            value={linkColor}
            onChange={(event) => setLinkColor(event.target.value)}
          >
            <option>blue</option>
            <option>green</option>
          </select>
        </label>
      </div>
      {heading && <h3>Big Head!</h3>}
      <button
        id="button-element"
        className="click-target"
        type="button"
        onClick={(event) => setClicked(event.currentTarget.id)}
      >
        I am BUTTON
      </button>
      <a
        id="anchor-element"
        href="#w4d1-exercise"
        style={{ color: linkColor }}
        onClick={(event) => setClicked(event.currentTarget.id)}
      >
        I am ANCHOR
      </a>
      {clicked && <p className="result">hey! you clicked: {clicked}</p>}
    </div>
  );
}

function WeatherDemo() {
  const [query, setQuery] = useState("Irvine, USA");
  const [weather, setWeather] = useState({
    name: "Irvine",
    country: "United States of America",
    temp: 294.15,
    min: 291.15,
    max: 298.15,
    status: "Clear",
  });
  const [message, setMessage] = useState("Sample data is shown until a search runs.");
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const search = async (event) => {
    event.preventDefault();
    if (!apiKey) {
      setMessage(
        "Add VITE_OPENWEATHER_API_KEY to .env to enable live weather search.",
      );
      return;
    }
    setMessage("Loading…");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${apiKey}`,
      );
      if (!response.ok) throw new Error("Location could not be loaded.");
      const data = await response.json();
      const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
      setWeather({
        name: data.name,
        country: regionNames.of(data.sys.country) || data.sys.country,
        temp: data.main.temp,
        min: data.main.temp_min,
        max: data.main.temp_max,
        status: data.weather[0].main,
      });
      setMessage("Live OpenWeather data loaded.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="weather-shell">
      <form className="weather-form" onSubmit={search}>
        <label className="field">
          Enter location
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <article className="weather-card">
        <span className="weather-icon">☀️</span>
        <p className="weather-temp">
          {kelvinToFahrenheit(weather.temp)}° F
        </p>
        <h3>
          {weather.name}, {weather.country}
        </h3>
        <div className="weather-details">
          <span>Low {kelvinToFahrenheit(weather.min)}°</span>
          <span>High {kelvinToFahrenheit(weather.max)}°</span>
          <span>{weather.status}</span>
        </div>
      </article>
      <p className="result">{message}</p>
    </div>
  );
}

function AlgorithmsDemo() {
  const [numbers, setNumbers] = useState("43, 59, 29, 18");
  const [factorialInput, setFactorialInput] = useState(10);
  const parsed = useMemo(
    () =>
      numbers
        .split(",")
        .map((value) => Number(value.trim()))
        .filter(Number.isFinite),
    [numbers],
  );
  const person = { firstname: "West", age: 80 };
  delete person.age;
  return (
    <div className="three-column">
      <article className="demo-card">
        <h3>O(log n) quicksort</h3>
        <input
          aria-label="Numbers to sort"
          value={numbers}
          onChange={(event) => setNumbers(event.target.value)}
        />
        <p className="result">{quickSort(parsed).join(", ")}</p>
      </article>
      <article className="demo-card">
        <h3>O(n!) factorial demo</h3>
        <input
          aria-label="Factorial number"
          type="number"
          min="0"
          max="12"
          value={factorialInput}
          onChange={(event) => setFactorialInput(Number(event.target.value))}
        />
        <p className="result">{factorial(factorialInput)}</p>
      </article>
      <article className="demo-card">
        <h3>Delete property</h3>
        <p>
          {person.firstname} is {String(person.age)} years old.
        </p>
        <code>{JSON.stringify(person)}</code>
      </article>
    </div>
  );
}

export default function Week4() {
  return (
    <>
      <Section
        id="w4d1-exercise"
        eyebrow="Week 4 · Day 1 · Exercise"
        title="DOM APIs"
        description="createElement/appendChild, body attributes, and click-target IDs are represented as safe React interactions."
      >
        <DomDemo />
      </Section>

      <Section
        id="w4d1-homework"
        eyebrow="Week 4 · Day 1 · Homework"
        title="React Weather App"
        description="OpenWeather fetch, location state, Kelvin conversion, current/low/high temperature, status, and country."
      >
        <WeatherDemo />
      </Section>

      <Section
        id="w4d2-exercise"
        eyebrow="Week 4 · Day 2 · Exercise"
        title="Data structures and Big O"
        description="DOM queries, quicksort, factorial, linear iteration, and object-property deletion."
      >
        <AlgorithmsDemo />
      </Section>

      <Section
        id="w4d2-homework"
        eyebrow="Week 4 · Day 2 · Homework"
        title="Todo List V5 sorting"
        description="Rush and Relax buttons pass list and sort direction to a localeCompare-based handler."
      >
        <TodoBoard initialData={initialTodos} allowSort showAll />
      </Section>

      <div id="w4d3-review">
        <Notice tone="success">
          Week 4 Day 3 is a 60-page review deck. It introduces no additional
          submission beyond the reviewed DOM, Fetch API, and sorting work
          above.
        </Notice>
      </div>
    </>
  );
}
