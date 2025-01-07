import React from "react";
import ChatWidget from "../chatscreen/ChatWidget";

const Home: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f0f0",
      }}
    >
      <ChatWidget />
    </div>
  );
};

export default Home;
