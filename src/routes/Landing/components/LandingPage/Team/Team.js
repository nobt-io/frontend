import React from "react";
import styles from "./Team.scss";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Grid from "react-bootstrap/lib/Grid";

export default class Team extends React.Component {

  setPosition = (position) => {
    let el = document.getElementById("team-img");
    el.innerHTML = "Position: " + position;
  };

  getDocumentOffsets = (element) => {

    let x=0, y=0;
    for (   ;
      element != null;
      x += element.offsetLeft, y += element.offsetTop, element = element.offsetParent
    ){}

    return {x : x, y: y};
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
      if (xBeforeImage) this.setPosition("1");
      if (xOnImage) this.setPosition("2");
      if (xAfterImage) this.setPosition("3");
    }
    if (yOnImage) {
      if (xBeforeImage) this.setPosition("4");
      if (xAfterImage) this.setPosition("6");

      if (xOnImage) {
        let oneThird = elementWidth / 3;

        if (cursorX < elementX + oneThird) this.setPosition("team-1");
        else if (cursorX < elementX + 2 * oneThird) this.setPosition("team-2");
        else this.setPosition("team-3");
      }
    }
    if (yUnderImage) {
      if (xBeforeImage) this.setPosition("7");
      if (xOnImage) this.setPosition("8");
      if (xAfterImage) this.setPosition("9");
    }
  };

  componentDidMount = () =>  {
    let element = document.getElementById("team-img");
    document.onmousemove = (e) => {
      let cursorX = event.pageX;
      let cursorY = event.pageY;
      this.handleMouseMove(cursorX, cursorY, element)
    };
  };

  render = () => (
    <section className={styles.Team} id={this.props.id}>
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <h2>The team behind nobt.</h2>
            <p className={styles.CoffeeInfo}>Crafted with <i className="fa fa-coffee"></i> in Vienna.</p>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
            <div id="team-img" className={styles.teamImage}>Test</div>
          </Col>
        </Row>
      </Grid>
    </section>
  );
}
