import { useState } from 'react';
import './App.css';
import Navi from "./components/Navi/Navi";
import Mood from "./components/Mood/Mood";
import MoosageLanding from './components/Moosages/MoosagesLanding'; 

function App() {
  const [mood, setMood] = useState(null);


  return (
    <>
    <div><Navi /></div>
    <div><MoosageLanding /></div>
    
    </>
  );
}

export default App;