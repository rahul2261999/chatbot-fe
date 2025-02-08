import React from "react";
import Chat from "../chatscreen";

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
      <Chat />
    </div>
  );
};

export default Home;
