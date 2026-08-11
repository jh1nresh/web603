import React from "react";
import {
  LinkHorizontal,
  LinkHorizontalLine,
  LinkHorizontalStep,
  LinkRadial,
  LinkRadialLine,
  LinkRadialStep,
  LinkVertical,
  LinkVerticalLine,
  LinkVerticalStep
} from "@vx/shape";

function Link({ data, linkType, layout, orientation, stepPercent, ...props }) {
  let LinkComponent;

  if (layout === "polar") {
    LinkComponent = linkType === "step"
      ? LinkRadialStep
      : linkType === "line"
        ? LinkRadialLine
        : LinkRadial;
  } else if (orientation === "vertical") {
    LinkComponent = linkType === "step"
      ? LinkVerticalStep
      : linkType === "line"
        ? LinkVerticalLine
        : LinkVertical;
  } else {
    LinkComponent = linkType === "step"
      ? LinkHorizontalStep
      : linkType === "line"
        ? LinkHorizontalLine
        : LinkHorizontal;
  }

  return (
    <LinkComponent
      data={data}
      percent={stepPercent}
      stroke="#aeeeee"
      strokeWidth="1"
      fill="none"
      {...props}
    />
  );
}

export default Link;
