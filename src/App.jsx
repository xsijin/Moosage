import { useState } from 'react';
import ThemeContext from './ThemeContext';
import './App.css';
import Navi from "./components/Navi/Navi";
import MoosageLanding from './components/Moosages/MoosagesLanding'; 

function App() {
  const [selectedTheme, setSelectedTheme] = useState('light');


  return (
    <>
    <ThemeContext.Provider value={selectedTheme}>
    <div><Navi setSelectedTheme={setSelectedTheme} /></div>
    <div><MoosageLanding /></div>
    </ThemeContext.Provider>
    </>
  );
}

export default App;