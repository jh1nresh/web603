import React, { useEffect, useState } from "react";
import { timer } from "d3-timer";
import { useCanvasSize, usePointLight, useRender } from "@react-vertex/core";
import { useVector3 } from "@react-vertex/math-hooks";
import { useOrbitCamera, useOrbitControls } from "@react-vertex/orbit-camera";
import LightOrb from "./LightOrb";
import Spheres from "./Spheres";

function Scene() {
  const { width, height } = useCanvasSize();
  const camera = useOrbitCamera(35, width / height, 1, 5000, (nextCamera) => {
    nextCamera.setPosition([0, 0, 600]);
  });
  useOrbitControls(camera);

  const [groupRotation, setGroupRotation] = useState([0, 0, 0]);
  const [lightPosition, setLightPosition] = useState([0, 0, 0]);
  const lightColor = useVector3(0.2, 0.9, 0.9);

  usePointLight(lightColor, lightPosition);
  const renderScene = useRender();

  useEffect(() => {
    const timerLoop = timer((elapsed) => {
      const angle = elapsed * 0.0006;
      setLightPosition([0, Math.cos(angle) * 150, Math.sin(angle) * 150]);
      setGroupRotation([0, angle, 0]);
      renderScene();
    });

    return () => timerLoop.stop();
  }, [renderScene]);

  return (
    <camera view={camera.view} projection={camera.projection}>
      <group rotation={groupRotation}>
        <Spheres layoutRadius={100} sphereCount={50} sphereRadius={10} />
      </group>
      <LightOrb color={lightColor} position={lightPosition} radius={3} />
    </camera>
  );
}

export default Scene;
