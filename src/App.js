import React, { useEffect, useState } from "react";
import Navbar from "./components/LandingPage/Navbar";
import HeroSection from "./components/LandingPage/HeroSection";
import AboutUs from "./components/LandingPage/AboutUs";
import Features from "./components/LandingPage/Features";
import ProjectLinks from "./components/LandingPage/ProjectLinks";
import Team from "./components/LandingPage/Team";
import "./App.css";
import ChatScreen from "./components/chatscreen/chatscreen";
import { v4 } from "uuid";

function App() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    let userToken = localStorage.getItem("user-token");

    if (!userToken || (userToken && userToken.length === 0)) {
      const userToken = v4();
      localStorage.setItem("user-token", userToken);
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
