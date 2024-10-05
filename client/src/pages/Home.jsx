import React from 'react';
import { useSnapshot } from 'valtio';
import Building from '../components/Building';
import state from '../store';

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <div>
      {!snap.intro && <Building />} 
    </div>
  );
};

export default Home;