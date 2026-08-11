import React from "react";
import { Group } from "@vx/group";
import { NodeGroup } from "react-move";
import Link from "./Link";
import { findCollapsedParent } from "./utils";

function Links({ links, linkType, layout, orientation, stepPercent }) {
  return (
    <NodeGroup
      data={links}
      keyAccessor={({ source, target }) => `${source.data.name}_${target.data.name}`}
      start={({ source }) => ({
        source: { x: source.data.x0, y: source.data.y0 },
        target: { x: source.data.x0, y: source.data.y0 }
      })}
      enter={({ source, target }) => ({
        source: { x: [source.x], y: [source.y] },
        target: { x: [target.x], y: [target.y] }
      })}
      update={({ source, target }) => ({
        source: { x: [source.x], y: [source.y] },
        target: { x: [target.x], y: [target.y] }
      })}
      leave={({ source }) => {
        const collapsedParent = findCollapsedParent(source);
        return {
          source: {
            x: [collapsedParent.data.x0],
            y: [collapsedParent.data.y0]
          },
          target: {
            x: [collapsedParent.data.x0],
            y: [collapsedParent.data.y0]
          }
        };
      }}
    >
      {(nodes) => (
        <Group>
          {nodes.map(({ key, state }) => (
            <Link
              key={key}
              data={state}
              linkType={linkType}
              layout={layout}
              orientation={orientation}
              stepPercent={stepPercent}
            />
          ))}
        </Group>
      )}
    </NodeGroup>
  );
}

export default Links;
