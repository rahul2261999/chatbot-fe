import React, { useState } from "react";
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
