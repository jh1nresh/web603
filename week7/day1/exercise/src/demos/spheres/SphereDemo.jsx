import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-vertex/core";
import Scene from "./Scene";
import "./spheres.css";

function SphereDemo() {
  const stageRef = useRef(null);
  const [size, setSize] = useState({ width: 900, height: 560 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const updateSize = () => {
      const { width, height } = stage.getBoundingClientRect();
      setSize({
        width: Math.max(1, Math.round(width)),
        height: Math.max(1, Math.round(height))
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="demo-panel sphere-demo">
      <div className="demo-heading">
        <h2>Sphere of Spheres</h2>
        <p>Drag to orbit the camera around 50 animated WebGL spheres.</p>
      </div>
      <div className="sphere-stage" ref={stageRef}>
        <Canvas width={size.width} height={size.height}>
          <Scene />
        </Canvas>
      </div>
    </section>
  );
}

export default SphereDemo;
