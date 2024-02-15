import { useState } from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Mood from "./components/Mood/Mood";

function App() {
  const [mood, setMood] = useState(null);


  return (
    <>
    <div><Navbar /></div>
    <div><Mood /></div>

    
    </>
  );
}

export default App;