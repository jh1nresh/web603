import React from "react";
import Tree from "./Tree";
import data from "./data";
import "./tree.css";

function TreeDemo() {
  return (
    <section className="demo-panel tree-demo">
      <div className="demo-heading">
        <h2>Collapsible Tree</h2>
        <p>Click a node to expand it, then change the orientation or link style.</p>
      </div>
      <div className="tree-canvas">
        <Tree data={data} width={600} height={500} />
      </div>
    </section>
  );
}

export default TreeDemo;
