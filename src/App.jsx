import { useState } from 'react';
import './App.css';
import Emoji from 'react-emojis';
import NavBar from "./components/Navbar/NavBar";
import Mood from "./components/Mood/Mood";

function App() {
  const [mood, setMood] = useState(null);

  const handleMoodChange = (event) => {
    const selectedMood = event.target.value;
    setMood(selectedMood);
  };

  return (
    <>
    <div><NavBar /></div>
    <div><Mood /></div>

    
    </>
  );
}

export default App;