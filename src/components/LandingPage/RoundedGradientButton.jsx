import React from "react";
import styles from "./RoundedGradientButton.module.css";

const RoundedGradientButton = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default RoundedGradientButton;
