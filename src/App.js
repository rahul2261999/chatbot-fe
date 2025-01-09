import React, { useEffect, useState } from "react";
import Navbar from "./components/LandingPage/Navbar";
import HeroSection from "./components/LandingPage/HeroSection";
import AboutUs from "./components/LandingPage/AboutUs";
import Features from "./components/LandingPage/Features";
import ProjectLinks from "./components/LandingPage/ProjectLinks";
import Team from "./components/LandingPage/Team";
import "./App.css";
import ChatScreen from "./components/chatscreen/chatscreen";

function App() {
  const [showChat, setShowChat] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("user-token"));

  const generateHex = (length) => {
    let hex = "";
    for (let i = 0; i < length; i++) {
      hex += Math.floor(Math.random() * 16).toString(16);
    }
    return hex;
  };

  useEffect(() => {
    if (!token) {
      const uniqToken = generateHex(8);
      localStorage.setItem("user-token", uniqToken);
      setToken(uniqToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="font-sans">
      <Navbar />
      <HeroSection setShowChat={setShowChat} />
      <AboutUs />
      <Features />
      <Team />
      <ProjectLinks />
      <ChatScreen showChat={showChat} setShowChat={setShowChat} />
    </div>
  );
}

export default App;
