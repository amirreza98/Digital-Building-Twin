// src/BabylonScene.jsx
import React, { useRef, useEffect } from 'react';
import { Engine, Scene } from '@babylonjs/core';
import '@babylonjs/loaders'; // برای بارگذاری مدل‌های مختلف
import {
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
  SceneLoader,
} from '@babylonjs/core';

const BabylonScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true);

    const createScene = () => {
      const scene = new Scene(engine);

      // ایجاد دوربین
      const camera = new ArcRotateCamera(
        'camera1',
        -Math.PI / 2,
        Math.PI / 2.5,
        10,
        Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);

      // ایجاد نور
      const light = new HemisphericLight(
        'light1',
        new Vector3(1, 1, 0),
        scene
      );

      // بارگذاری مدل سه‌بعدی
      SceneLoader.Append(
        '',
        'models/building.gltf', // مسیر مدل خود را وارد کنید
        scene,
        function (scene) {
          // تنظیم نور و دوربین پس از بارگذاری مدل
          scene.createDefaultCameraOrLight(true, true, true);
        }
      );

      return scene;
    };

    const scene = createScene();

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener('resize', () => {
      engine.resize();
    });

    // پاک‌سازی منابع هنگام خروج از کامپوننت
    return () => {
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default BabylonScene;
