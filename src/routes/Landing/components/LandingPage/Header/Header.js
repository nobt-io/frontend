import React from "react";
import styles from "./Header.scss";
import BackgroundImage from "./bg.jpg";
import ScreenImage from "./screen.jpg";
import Device from "./device.png";

import StartButton from "../StartButton"

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export default class Header extends React.Component {

  render = () => (
    <header className={styles.header}
            style={{backgroundImage: "url('" + BackgroundImage + "')"}}
    >
      <Grid>
        <Row>
          <Col sm={7}>
            <div className={styles.content}>
              <div>
                <h1>split your bills</h1>
                <h1 className={styles.handwritten}>with ease</h1>
                <StartButton />
              </div>
            </div>
          </Col>
          <Col sm={5}>
            <div className={styles.mockup}>
              <div className={styles.device} style={{backgroundImage: "url('" + Device + "')"}}>
                <div className={styles.screen}>
                  <img src={ScreenImage} alt="" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </header>
  )
}
