import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import Building from '../components/Building';
import state from '../store';

const Home = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  const handleBackClick = () => {
    state.intro = true;
    navigate('/');
  };

  return (
    <div>
      {!snap.intro && (
        <>
          <Building />
          <button onClick={handleBackClick}>بازگشت به صفحه قبل</button> 
        </>
      )}
    </div>
  );
};

export default Home;