import React from "react";
import styles from "./Features.scss";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Grid from "react-bootstrap/lib/Grid";

export default class Features extends React.Component {

  render = () => (
    <section className={styles.features} id={this.props.id}>
      <Grid>
        <Row>
          <Col sm={4}>
            <div className={styles.feature}>
              <div className={styles.icon}><i className="fa fa-dashboard"></i></div>
              <h3>Easy to Use</h3>
              <p>Nobt.io works without registration. Start by creating a nobt and share the link with your friends.</p>
            </div>
          </Col>
          <Col sm={4}>
            <div className={styles.feature}>
              <div className={styles.icon}><i className="fa fa-cloud"></i></div>
              <h3>Available Everywhere</h3>
              <p>Nobts are stored in the cloud, so you can access them from any device, anytime, no matter where you are.</p>
            </div>
          </Col>
          <Col sm={4}>
            <div className={styles.feature}>
              <div className={styles.icon}><i className="fa fa-github"></i></div>
              <h3>Open Source</h3>
              <p>We believe that the Web should be open that's why we share everything about nobt.io, except your data.</p>
            </div>
          </Col>
        </Row>
      </Grid>
    </section>
  )
}
