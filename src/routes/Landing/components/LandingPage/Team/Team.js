import React from "react";
import styles from "./Team.scss";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Grid from "react-bootstrap/lib/Grid";

export default class Team extends React.Component {

  setPosition = (pictureElement, position) => {
    pictureElement.innerHTML = "Position: " + position;
  };

  getDocumentOffsets = (element) => {

    let x = 0, y = 0;
    for (;
      element != null;
      x += element.offsetLeft, y += element.offsetTop, element = element.offsetParent
    ) {
    }

    return {x: x, y: y};
  };

  handleMouseMove = (cursorX, cursorY, pictureElement) => {
    let offsets = this.getDocumentOffsets(pictureElement);

    let elementX = offsets.x;
    let elementY = offsets.y;
    let elementHeight = pictureElement.offsetHeight;
    let elementWidth = pictureElement.offsetWidth;


    let yAboveImage = cursorY < elementY;
    let yOnImage = cursorY > elementY && cursorY < elementY + elementHeight;
    let yUnderImage = cursorY > elementY + elementHeight;
    let xBeforeImage = cursorX < elementX;
    let xOnImage = cursorX > elementX && cursorX < elementX + elementWidth;
    let xAfterImage = cursorX > elementX + elementWidth;

    if (yAboveImage) {
      if (xBeforeImage) {
        this.setPosition(pictureElement, "1");
      }
      if (xOnImage) {
        this.setPosition(pictureElement, "2");
      }
      if (xAfterImage) {
        this.setPosition(pictureElement, "3");
      }
    }
    if (yOnImage) {
      if (xBeforeImage) {
        this.setPosition(pictureElement, "4");
      }
      if (xOnImage) {
        this.setPosition(pictureElement, "5");
      }
      if (xAfterImage) {
        this.setPosition(pictureElement, "6");
      }
    }
    if (yUnderImage) {
      if (xBeforeImage) {
        this.setPosition(pictureElement, "7");
      }
      if (xOnImage) {
        this.setPosition(pictureElement, "8");
      }
      if (xAfterImage) {
        this.setPosition(pictureElement, "9");
      }
    }
  };


  componentDidMount = () => {
    let teamMember1 = document.getElementById("team-member1");
    let teamMember2 = document.getElementById("team-member2");
    let teamMember3 = document.getElementById("team-member3");

    document.onmousemove = (event) => {
      let cursorX = event.pageX;
      let cursorY = event.pageY;

      this.handleMouseMove(cursorX, cursorY, teamMember1);
      this.handleMouseMove(cursorX, cursorY, teamMember2);
      this.handleMouseMove(cursorX, cursorY, teamMember3);
    };
  };

  render = () => (
    <section className={styles.Team} id={this.props.id}>
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <h2>The team behind nobt.</h2>
            <p className={styles.CoffeeInfo}>Crafted with <i className="fa fa-coffee"></i> in Vienna.</p>
            <p>What started as a hackathon by three motivated developers soon turned out to be an actually helpful companion in our daily life.
              Nobt.io is our effort to share this idea with all of you. We hope you enjoy it as much as we do.</p>
            <div className={styles.teamImages}>
              <div id="team-member1">Test</div>
              <div id="team-member2">Test</div>
              <div id="team-member3">Test</div>
            </div>
          </Col>
        </Row>
      </Grid>
    </section>
  );
}
