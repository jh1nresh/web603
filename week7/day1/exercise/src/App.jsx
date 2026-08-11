import React from "react";
import {
  HashRouter,
  NavLink,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import BarChart from "./demos/bar-chart/BarChart";
import SphereDemo from "./demos/spheres/SphereDemo";
import TreeDemo from "./demos/tree/TreeDemo";

const demos = [
  { path: "/bar-chart", label: "Bar Chart", component: BarChart },
  { path: "/spheres", label: "Sphere of Spheres", component: SphereDemo },
  { path: "/tree", label: "Collapsible Tree", component: TreeDemo }
];

function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <header className="site-header">
          <div>
            <p className="eyebrow">Week 7 · Day 1 · Exercise</p>
            <h1>React Animation Gallery</h1>
          </div>
          <nav className="demo-nav" aria-label="Animation demos">
            {demos.map(({ path, label }) => (
              <NavLink key={path} to={path} activeClassName="active">
                {label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="demo-main">
          <Switch>
            {demos.map(({ path, component }) => (
              <Route key={path} path={path} component={component} />
            ))}
            <Redirect to="/bar-chart" />
          </Switch>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
