import React, { useEffect, useState } from "react";
import { CheckCircle } from "react-feather";
import styles from "./landingPage.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const LandingPage = ({ setShowChat }) => {
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
    <div className={styles.landingPage}>
      <header className={styles.header}>
        <h1>INFOBOTICS</h1>
        <p>Your AI Partner for Smarter Social Media Strategies.</p>
        <button
          className={styles.ctaButton}
          onClick={() => {
            setShowChat(true);
          }}
        >
          Get Started
        </button>
      </header>
      <section className={styles.about}>
        <h2>About Our AI Chatbot</h2>
        <p>
          Welcome to <strong>INFOBOTICS</strong>, the AI-powered chatbot
          revolutionizing social media performance analysis. INFOBOTICS is more
          than just a platform—it’s your intelligent assistant for understanding
          and optimizing your social media presence.
        </p>

        <p>
          Designed for businesses, influencers, and marketers, INFOBOTICS brings
          the power of AI to your fingertips. With a user-friendly interface and
          real-time communication, our chatbot empowers you to make data-driven
          decisions and stay ahead in the competitive social media landscape.
        </p>
        <p>
          Experience the future of social media analysis with{" "}
          <strong>INFOBOTICS</strong>—your AI chatbot for smarter insights and
          better results!
        </p>
        <div>&nbsp;</div>
      </section>
      <main className={styles.mainContent}>
        <section className={styles.features}>
          <h2>Features</h2>
          <ul>
            <li>
              <CheckCircle className={styles.icon} />
              AI-Powered Chatbot
            </li>
            <li>
              <CheckCircle className={styles.icon} />
              Post Performance Evaluation
            </li>
            <li>
              <CheckCircle className={styles.icon} />
              Engagement Insights
            </li>
            <li>
              <CheckCircle className={styles.icon} />
              Geographical Data Mapping
            </li>
            <li>
              <CheckCircle className={styles.icon} />
              Video Watch Time Analysis
            </li>
          </ul>
        </section>

        <section className={styles.foundingMembers}>
          <h2>Team Members</h2>
          <div className={styles.membersContainer}>

            <div className={styles.member}>
              <img
                src="https://ca.slack-edge.com/TC3TKQU8P-U031ZCQ94CU-96228cf09192-512"
                alt="Member 1"
                className={styles.memberImage}
              />
              <p>Anirban Pal</p>
              <div className={styles.socialProfile}>
                <a href="https://github.com/approjecthub" target="_blank" rel="noreferrer">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/anirban-pal-6a1243130/" target="_blank" rel="noreferrer">
                  <FaLinkedin fill="blue" />
                </a>
              </div>
            </div>

            <div className={styles.member}>
              <img
                src="https://ca.slack-edge.com/TC3TKQU8P-U041DKG7T4Z-59d0d70f0171-512"
                alt="Member 2"
                className={styles.memberImage}
              />
              <p>Akshay K S</p>
              <div className={styles.socialProfile}>
                <a href="https://github.com/akshayks3" target="_blank" rel="noreferrer">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/akshayks3/" target="_blank" rel="noreferrer">
                  <FaLinkedin fill="blue" />
                </a>
              </div>
            </div>

            <div className={styles.member}>
              <img
                src="https://ca.slack-edge.com/TC3TKQU8P-U05E5GC1JGJ-bd6f91d3e2f6-512"
                alt="Member 3"
                className={styles.memberImage}
              />
              <p>Rahul Saini</p>
              <div className={styles.socialProfile}>
                <a href="https://github.com/rahul2261999" target="_blank" rel="noreferrer">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/rahul-saini22/" target="_blank" rel="noreferrer">
                  <FaLinkedin fill="blue" />
                </a>
              </div>
            </div>

            <div className={styles.member}>
              <img
                src="https://ca.slack-edge.com/TC3TKQU8P-U03KXNJR36V-8bb379f48174-512"
                alt="Member 4"
                className={styles.memberImage}
              />
              <p>Naman Sinha</p>
              <div className={styles.socialProfile}>
                <a href="https://github.com/Greyroot328" target="_blank" rel="noreferrer">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/namansinha-in/" target="_blank" rel="noreferrer">
                  <FaLinkedin fill="blue" />
                </a>
              </div>
            </div>
          </div>

        </section>

        <section className={styles.projectResource}>
          <h2>Project Resource</h2>
          <div>
            <div className={styles.demoVideo}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/80SuSCE3SKU?si=3Hpu9CtMvIfKmfp7"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>

            <div className={styles.projectLinks}>
              <h4>Source Code</h4>
              <a className={styles.fe} href="https://github.com/rahul2261999/chatbot-fe/tree/langflow-ui" target="_blank" rel="noreferrer">
                <span> Explore the Frontend Repository</span> <FaGithub />
              </a>
              <a className={styles.be} href="https://github.com/rahul2261999/chatbot-be/tree/lanflow-api-integration" target="_blank" rel="noreferrer">
                <span> Explore the Backend Repository</span> <FaGithub />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 AI Chatbot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
