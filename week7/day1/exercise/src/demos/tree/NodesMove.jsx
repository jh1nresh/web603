import React from "react";
import { Group } from "@vx/group";
import { NodeGroup } from "react-move";
import Node from "./Node";
import { findCollapsedParent, getTopLeft } from "./utils";

function Nodes({ nodes, layout, orientation, onNodeClick }) {
  return (
    <NodeGroup
      data={nodes}
      keyAccessor={(node) => node.data.name}
      start={(node) => {
        const parentPosition = getTopLeft(
          node.parent || { x: 0, y: 0 },
          layout,
          orientation
        );
        return {
          top: parentPosition.top,
          left: parentPosition.left,
          opacity: 0
        };
      }}
      enter={(node) => {
        const position = getTopLeft(node, layout, orientation);
        return { top: [position.top], left: [position.left], opacity: [1] };
      }}
      update={(node) => {
        const position = getTopLeft(node, layout, orientation);
        return { top: [position.top], left: [position.left], opacity: [1] };
      }}
      leave={(node) => {
        const collapsedParent = findCollapsedParent(node.parent);
        const position = getTopLeft(
          { x: collapsedParent.data.x0, y: collapsedParent.data.y0 },
          layout,
          orientation
        );
        return { top: [position.top], left: [position.left], opacity: [0] };
      }}
    >
      {(animatedNodes) => (
        <Group>
          {animatedNodes.map(({ key, data: node, state }) => (
            <Group
              key={key}
              top={state.top}
              left={state.left}
              opacity={state.opacity}
            >
              <Node node={node} onClick={() => onNodeClick(node)} />
            </Group>
          ))}
        </Group>
      )}
    </NodeGroup>
  );
}

export default Nodes;
