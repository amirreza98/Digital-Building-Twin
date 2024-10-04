import React, { useState } from 'react';
import BabylonScene from './BabylonScene';

function App() {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  return (
    <div>
      <button onClick={() => setIsAnimationStarted(true)}>
        Start Animation
      </button>
      <BabylonScene isAnimationStarted={isAnimationStarted} />
    </div>
  );
}

export default App;