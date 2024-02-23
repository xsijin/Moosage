import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import ThemeContext from './ThemeContext';
import './App.css';
import Navi from './components/Navi/Navi';
import Dashboard from './components/Navi/Dashboard'; 

function App() {
  const [selectedTheme, setSelectedTheme] = useState('light');


  return (
    <>
    <ThemeContext.Provider value={selectedTheme}>



    <nav><Navi setSelectedTheme={setSelectedTheme} /></nav>


    <main>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      </Routes>
    </main>



    </ThemeContext.Provider>
    </>
  );
}

export default App;