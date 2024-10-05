import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Intro from './pages/Intro';
import { BabylonProvider } from './contexts/BabylonContext'; //  اضافه  کردن  

function App() {
  return (
    <BabylonProvider> {/*  اضافه  کردن  */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </BabylonProvider> 
  );
}

export default App;