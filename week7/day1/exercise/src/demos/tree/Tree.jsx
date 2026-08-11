import React, { Component, Fragment } from "react";
import { LinearGradient } from "@vx/gradient";
import { Group } from "@vx/group";
import { Tree as HierarchyTree } from "@vx/hierarchy";
import { hierarchy } from "d3-hierarchy";
import Links from "./LinksMove";
import Nodes from "./NodesMove";

class Tree extends Component {
  state = {
    layout: "cartesian",
    orientation: "horizontal",
    linkType: "diagonal",
    stepPercent: 0.5
  };

  render() {
    const {
      data,
      width,
      height,
      margin = { top: 30, left: 30, right: 30, bottom: 30 }
    } = this.props;
    const { layout, orientation, linkType, stepPercent } = this.state;

    if (width < 10) return null;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const origin = { x: 0, y: 0 };
    const sizeWidth = orientation === "vertical" ? innerWidth : innerHeight;
    const sizeHeight = orientation === "vertical" ? innerHeight : innerWidth;
    const root = hierarchy(data, (item) => (item.isExpanded ? item.children : null));

    return (
      <Fragment>
        <div className="tree-controls">
          <label>
            Orientation
            <select
              onChange={(event) => this.setState({ orientation: event.target.value })}
              value={orientation}
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </label>
          <label>
            Link
            <select
              onChange={(event) => this.setState({ linkType: event.target.value })}
              value={linkType}
            >
              <option value="diagonal">Diagonal</option>
              <option value="step">Step</option>
              <option value="line">Line</option>
            </select>
          </label>
        </div>
        <svg width={width} height={height} role="img" aria-label="Collapsible tree">
          <LinearGradient id="lg" from="#fff" to="#aaa" />
          <rect width={width} height={height} rx={14} fill="#888" />
          <HierarchyTree
            top={margin.top}
            left={margin.left}
            root={root}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
          >
            {({ data: treeData }) => (
              <Group top={origin.y} left={origin.x}>
                <Links
                  links={treeData.links()}
                  linkType={linkType}
                  layout={layout}
                  orientation={orientation}
                  stepPercent={stepPercent}
                />
                <Nodes
                  nodes={treeData.descendants()}
                  layout={layout}
                  orientation={orientation}
                  onNodeClick={(node) => {
                    if (!node.data.isExpanded) {
                      node.data.x0 = node.x;
                      node.data.y0 = node.y;
                    }
                    node.data.isExpanded = !node.data.isExpanded;
                    this.forceUpdate();
                  }}
                />
              </Group>
            )}
          </HierarchyTree>
        </svg>
      </Fragment>
    );
  }
}

export default Tree;
