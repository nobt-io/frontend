import React from "react";
import styles from "./About.scss";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import StepOneImage from "./step1.png";
import StepTwoImage from "./step2.png";
import StepThreeImage from "./step3.png";
import StartButton from "../StartButton";

export default class About extends React.Component {

  render = () => (
    <section className={styles.About} id={this.props.id}>
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>

            <h2>You will <i className="fa fa-heart-o" style={{"color": "#d50000"}}></i> nobt.</h2>

            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
              Lorem ipsum dolor sit amet.</p>

            <StartButton active />

            <div className={styles.Steps}>
              <Row>
                <Col sm={4}>
                  <div className={styles.Counter}><span>1</span></div>
                  <h4>Create Nobt</h4>
                  <div><img src={StepOneImage} /></div>
                </Col>
                <Col sm={4}>
                  <div className={styles.Counter}><span>2</span></div>
                  <h4>Add Friends</h4>
                  <div><img src={StepTwoImage} /></div>
                </Col>
                <Col sm={4}>
                  <div className={styles.Counter}><span>3</span></div>
                  <h4>Split Bills</h4>
                  <div><img src={StepThreeImage} /></div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Grid>
    </section>
  )
}
