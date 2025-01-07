import { useState } from "react";
import ChatScreen from "./components/chatscreen/chatscreen";
import LandingPage from "./components/LandingPage/landingPage";
import "./App.css";

function App() {
  const [showChat, setShowChat] = useState(false);
  return (
    <>
      <ChatScreen showChat={showChat} setShowChat={setShowChat} />
      <LandingPage setShowChat={setShowChat} />
    </>
  );
}

export default App;
