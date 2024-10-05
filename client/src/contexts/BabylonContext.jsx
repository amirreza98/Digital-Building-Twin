import React, { createContext, useState, useEffect, useRef } from 'react';
import { Engine, Scene, HemisphericLight, Vector3, ArcRotateCamera } from '@babylonjs/core';
import state from '../store';
import { useSnapshot } from 'valtio';

const BabylonContext = createContext({});

const BabylonProvider = ({ children }) => {
  const [scene, setScene] = useState(null);
  const canvasRef = useRef(null);
  const [isSceneReady, setIsSceneReady] = useState(false);
  const snap = useSnapshot(state); //  اضافه  کردن  

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    // -- Light --
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    // -- Camera --
    const camera = new ArcRotateCamera(
      'camera',
      snap.intro ? Math.PI / 4 : -Math.PI / 3,
      snap.intro ? Math.PI / 4 : Math.PI / 3,
      snap.intro ? 20 : 10,
      new Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);

    setScene(scene);
    setIsSceneReady(true);

    engine.runRenderLoop(() => {
      scene.render();
    });

    return () => {
      engine.dispose();
    };
  }, [snap.intro]); //  اضافه  کردن   snap.intro   به   dependency array  

  return (
    <BabylonContext.Provider value={{ scene, isSceneReady }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      {isSceneReady && children}
    </BabylonContext.Provider>
  );
};

export { BabylonContext, BabylonProvider };