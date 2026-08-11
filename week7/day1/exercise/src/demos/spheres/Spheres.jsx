import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useTexture2d } from "@react-vertex/core";
import { useSphereElements } from "@react-vertex/geometry-hooks";
import { usePhongTextured } from "@react-vertex/material-hooks";
import textureImage from "./abstract.jpg";

function Spheres({ layoutRadius, sphereCount, sphereRadius }) {
  const [texture] = useTexture2d(textureImage);
  const program = usePhongTextured(texture, 0.1);
  const sphere = useSphereElements(sphereRadius, 20, 20);

  const positions = useMemo(() => {
    const result = [];

    for (let index = 0; index < sphereCount; index += 1) {
      const latitude = Math.acos(-1 + (2 * index) / sphereCount);
      const longitude = Math.sqrt((sphereCount - 1) * Math.PI) * latitude;

      result.push([
        layoutRadius * Math.cos(longitude) * Math.sin(latitude),
        layoutRadius * Math.sin(longitude) * Math.sin(latitude),
        layoutRadius * Math.cos(latitude)
      ]);
    }

    return result;
  }, [sphereCount, layoutRadius]);

  return (
    <material program={program}>
      {positions.map((position, index) => (
        <geometry key={index} position={position} {...sphere} />
      ))}
    </material>
  );
}

Spheres.propTypes = {
  sphereCount: PropTypes.number.isRequired,
  sphereRadius: PropTypes.number.isRequired,
  layoutRadius: PropTypes.number.isRequired
};

export default Spheres;
