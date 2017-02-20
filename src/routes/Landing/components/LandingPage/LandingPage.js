import React from "react";
import styles from "./LandingPage.scss";
import BackgroundImage from "./assets/bg.jpg";
import LocationBuilder from "../../../App/modules/navigation/LocationBuilder";
import Button from "components/Button";

export default class LandingPage extends React.Component {

  render = () => (
    <div
      className={styles.landingPage}
      style={{backgroundImage: "url('" + BackgroundImage + "')"}}
    >

      <div className={styles.contentContainer}>

        <div className={styles.title}>nobt.io</div>
        <div className={styles.slogan}>Split your bills with ease</div>

        <div className={styles.buttonContainer}>
          <Button
            label="Create a Nobt"
            onClick={() => LocationBuilder.fromWindow().push("create").apply(this.props.push)}
            raised
            primary
          />
        </div>

      </div>
    </div>
  )
}
