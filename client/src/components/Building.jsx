import React, { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
  SceneLoader,
  Animation,
} from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import state from '../store';

const Building = () => {
  const snap = useSnapshot(state);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    // -- Camera --
    const camera = new ArcRotateCamera(
      'camera',
      -Math.PI / 2,
      Math.PI / 2,
      10,
      new Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);

    //  تنظیمات دوربین بر اساس state
    if (snap.intro) {
      camera.alpha = Math.PI / 4;
      camera.beta = Math.PI / 4;
      camera.radius = 20;
    } else {
      camera.alpha = -Math.PI / 3;
      camera.beta = Math.PI / 3;
      camera.radius = 10;
    }

    // -- Light --
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    // -- Load Model --
    SceneLoader.ImportMeshAsync('', '/models/', 'building.gltf', scene)
      .then((result) => {
        const cube = scene.getMeshByName("Cube.001");

        if (cube) {
          // -- Animation --
          const animation = new Animation(
            "moveAnimation",
            "position",
            60,
            Animation.ANIMATIONTYPE_VECTOR3
          );
          animation.setKeys([
            { frame: 0, value: cube.position.clone() },
            { frame: 60, value: new Vector3(2, 0, 0) }
          ]);
          cube.animations.push(animation);

          if (!snap.intro) {
            scene.beginAnimation(cube, 0, 60, false);
          }
        } else {
          console.error("Cube.001 not found in the loaded model.");
        }
      });

    // -- Render Loop --
    engine.runRenderLoop(() => {
      scene.render();
    });

    // -- Cleanup --
    return () => {
      engine.dispose();
    };
  }, [snap.intro]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default Building;