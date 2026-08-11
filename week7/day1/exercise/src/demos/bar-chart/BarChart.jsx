import React, { Component } from "react";
import NodeGroup from "react-move/NodeGroup";
import {
  getAppendedData,
  getInitialData,
  getTruncatedData,
  getUpdatedData
} from "./helpers";
import "./bar-chart.css";

const barHeight = 25;
const barPadding = 2;
const barColour = "#348aa7";
const widthScale = (value) => value * 5;

function BarGroup({ data, state }) {
  const width = widthScale(state.value);
  const yMid = barHeight * 0.5;

  return (
    <g className="bar-group" transform={`translate(0, ${state.y})`}>
      <rect
        y={barPadding * 0.5}
        width={width}
        height={barHeight - barPadding}
        style={{ fill: barColour, opacity: state.opacity }}
      />
      <text
        className="value-label"
        x={width - 6}
        y={yMid}
        alignmentBaseline="middle"
      >
        {state.value.toFixed(0)}
      </text>
      <text
        className="name-label"
        x="-6"
        y={yMid}
        alignmentBaseline="middle"
        style={{ opacity: state.opacity }}
      >
        {data.name}
      </text>
    </g>
  );
}

class BarChart extends Component {
  state = {
    data: getInitialData()
  };

  handleAdd = () => {
    this.setState(({ data }) => ({ data: getAppendedData(data) }));
  };

  handleRemove = () => {
    this.setState(({ data }) => ({ data: getTruncatedData(data) }));
  };

  handleUpdate = () => {
    this.setState(({ data }) => ({ data: getUpdatedData(data) }));
  };

  startTransition = (item, index) => ({
    value: 0,
    y: index * barHeight,
    opacity: 0
  });

  enterTransition = (item) => ({
    value: [item.value],
    opacity: [1],
    timing: { duration: 250 }
  });

  updateTransition = (item, index) => ({
    value: [item.value],
    y: [index * barHeight],
    timing: { duration: 300 }
  });

  leaveTransition = () => ({
    y: [-barHeight],
    opacity: [0],
    timing: { duration: 250 }
  });

  render() {
    const { data } = this.state;

    return (
      <section className="demo-panel bar-chart-demo">
        <div className="demo-heading">
          <h2>Animated Bar Chart</h2>
          <p>Add, remove, or update data to see react-move transitions.</p>
        </div>
        <div className="bar-chart-controls">
          <button type="button" onClick={this.handleAdd}>Add item</button>
          <button type="button" onClick={this.handleRemove} disabled={!data.length}>
            Remove item
          </button>
          <button type="button" onClick={this.handleUpdate} disabled={!data.length}>
            Update values
          </button>
        </div>
        <div className="bar-chart-canvas">
          <svg
            width="800"
            height={Math.max(320, data.length * barHeight + 40)}
            role="img"
            aria-label="Animated horizontal bar chart"
          >
            <g className="chart" transform="translate(100,10)">
              <NodeGroup
                data={data}
                keyAccessor={(item) => item.name}
                start={this.startTransition}
                enter={this.enterTransition}
                update={this.updateTransition}
                leave={this.leaveTransition}
              >
                {(nodes) => (
                  <g>
                    {nodes.map(({ key, data: item, state }) => (
                      <BarGroup key={key} data={item} state={state} />
                    ))}
                  </g>
                )}
              </NodeGroup>
            </g>
          </svg>
        </div>
      </section>
    );
  }
}

export default BarChart;
