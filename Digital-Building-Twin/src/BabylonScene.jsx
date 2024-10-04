import React, { useRef, useEffect } from 'react';
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, SceneLoader, Animation } from '@babylonjs/core';
import '@babylonjs/loaders/glTF'; 

const BabylonScene = ({ isAnimationStarted }) => {
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

    // -- Light --
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    SceneLoader.ImportMesh(
      '', //  اینجا خالی باشه چون  فایل  در پوشه 'models'  هست
      'models/', 
      'building.gltf', 
      scene,
      (meshes) => {
        const cube = scene.getMeshByName("Cube.001"); 

        if (cube) {
          //  انیمیشن موقعیت  برای Cube.001
          const animation = new Animation(
            "moveAnimation",
            "position", 
            60,
            Animation.ANIMATIONTYPE_VECTOR3 
          );
          animation.setKeys([
            { frame: 0, value: cube.position.clone(0, 0, 0) }, //  موقعیت فعلی
            { frame: 60, value: new Vector3(-0.7, 0.7, 0) }  //  موقعیت نهایی
          ]);
          cube.animations.push(animation);

          if (isAnimationStarted) {
            scene.beginAnimation(cube, 0, 60, false);
            console.log("mission completed")
          }
        } else {
          console.error("Cube.001 not found in the loaded model.");
        }
      }
    );

    engine.runRenderLoop(() => {
      scene.render();
    });

    return () => {
      engine.dispose();
    };
  }, [isAnimationStarted]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default BabylonScene;