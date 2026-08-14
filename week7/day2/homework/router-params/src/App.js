import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const mediaApps = [
  {
    id: "Netflix",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg",
    className: "nf"
  },
  {
    id: "HBO Max",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg",
    className: "hb"
  },
  {
    id: "Hulu",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Hulu_logo_%282018%29.svg",
    className: "hu"
  },
  {
    id: "Prime Video",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
    className: "pr"
  }
];

export default function App() {
  return (
    <Router>
      <main className="app">
        <h2>TV APPS</h2>
        <nav aria-label="TV apps">
          {mediaApps.map(({ id, image, className }) => (
            <Link key={id} to={`/${id}`} aria-label={`Select ${id}`}>
              <img src={image} alt={id} className={className} />
            </Link>
          ))}
        </nav>

        <Switch>
          <Route path="/:id">
            <Child />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

function Child() {
  const { id } = useParams();

  return (
    <div>
      <h3>
        You Selected:<span>{id}</span>
      </h3>
    </div>
  );
}
