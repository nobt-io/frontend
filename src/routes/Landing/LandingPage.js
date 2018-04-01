import React from "react";
import Header from "./Header";
import About from "./About";
import Features from "./Features";
import Team from "./Team";
import Footer from "./Footer";
import styles from "./LandingPage.scss";

export default class LandingPage extends React.Component {
  render = () => (
    <div className={styles.container}>
      <Header/>
      <About id="section-about" />
      <Features id="section-features" />
      <Team id="section-team" />
      <Footer />

    </div>
  )
}
