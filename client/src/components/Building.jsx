import React, { useContext, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { SceneLoader, Vector3, Animation } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import state from '../store';
import { BabylonContext } from '../contexts/BabylonContext';

const Building = () => {
  const { scene } = useContext(BabylonContext);
  const snap = useSnapshot(state);

  useEffect(() => {
    let cube;
    if (scene) {
      SceneLoader.ImportMeshAsync('', '/models/', 'building.gltf', scene)
        .then((result) => {
          cube = scene.getMeshByName("Cube.001");

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
    }
  }, [scene, snap.intro]);

  return null; 
};

export default Building;