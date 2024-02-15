import { useState } from 'react';
import './App.css';
import Navi from "./components/Navi/Navi";
import Mood from "./components/Mood/Mood";

function App() {
  const [mood, setMood] = useState(null);


  return (
    <>
    <div><Navi /></div>
    <div><Mood /></div>

    
    </>
  );
}

export default App;