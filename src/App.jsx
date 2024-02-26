import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeContext from './ThemeContext';
import './App.css';
import Navi from './components/Navi/Navi';
import Dashboard from './components/Navi/Dashboard'; 
import MoosageLanding from './components/Moosages/MoosagesLanding';
import LandingError from './components/Moosages/LandingError';

function App() {
  const [selectedTheme, setSelectedTheme] = useState('emerald');


  return (
    <>
    <ThemeContext.Provider value={selectedTheme}>



    <nav><Navi setSelectedTheme={setSelectedTheme} /></nav>


    <main>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/moosages/show/:boardId" element={<MoosageLanding />} />
      <Route path="*" element={<LandingError />} />
      </Routes>
    </main>



    </ThemeContext.Provider>
    </>
  );
}

export default App;