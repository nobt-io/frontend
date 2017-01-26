import React from "react";
import styles from "./LandingPage.scss"
import NewNobtForm from "./NewNobtForm";
import Footer from "./Footer";
import BackgroundImage from './assets/bg.jpg'
import { Link } from "react-router";
import LocationBuilder from "../../../App/modules/navigation/LocationBuilder";

export default class LandingPage extends React.Component {

  render = () => (
    <div
      className={styles.landingPage}
      style={{backgroundImage: "url('" + BackgroundImage + "')"}}
    >

      <div className={styles.contentContainer}>

        <div className={styles.title}>nobt.io</div>
        <div className={styles.slogan}>Split your bills with ease</div>

        <Link to={LocationBuilder.fromWindow().push("create").path}>
          Create Nobt
        </Link>
      </div>


      <Footer />
    </div>
  )
}
