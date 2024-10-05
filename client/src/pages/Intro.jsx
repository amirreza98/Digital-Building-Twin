import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import Building from '../components/Building';
import state from '../store';

const Intro = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  const handleClick = () => {
    state.intro = false;
    navigate('/home');
  }

  return (
    <div className='intro'>
        {snap.intro && (
          <>
            <div className="description">
                <h1>
                    LET'S DO IT.
                </h1>
                <p>
                    create your unique and exclusive House and predict all your needs for your home. <strong>Unless your imagination</strong>{" "} and define your own style.
                </p>

                <button className='start-btn filled' onClick={handleClick}>
                    Customize It
                </button>
            </div>

            <div className="canvas">
              <Building/>
            </div>
          </>
        )}
    </div>
  );
};

export default Intro;