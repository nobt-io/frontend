import React from 'react';
import styles from './Team.scss';

export default class Team extends React.Component {
  hideDetails = pictureElement => {
    pictureElement.firstChild.style.display = `none`;
  };

  showDetails = pictureElement => {
    pictureElement.firstChild.style.display = `block`;
  };

  setImage = (pictureElement, position) => {
    const imageHeight = 200;
    pictureElement.style.backgroundPosition = `0px -${position *
      imageHeight}px`;
  };

  getDocumentOffsets = element => {
    let x = 0,
      y = 0;
    for (
      ;
      element != null;
      x += element.offsetLeft,
        y += element.offsetTop,
        element = element.offsetParent
    ) {
      // eslint-disable-line no-empty
    }

    return { x: x, y: y };
  };

  setImageAccordingToMouse = (cursorX, cursorY, pictureElement) => {
    let offsets = this.getDocumentOffsets(pictureElement);
    let elementX = offsets.x;
    let elementY = offsets.y;

    let height = pictureElement.offsetHeight;
    let width = pictureElement.offsetWidth;

    let elementCenterX = elementX + width / 2;
    let elementCenterY = elementY + height / 2;

    let yOnImage = cursorY > elementY && cursorY < elementY + height;
    let xOnImage = cursorX > elementX && cursorX < elementX + width;
    let onImage = yOnImage && xOnImage;

    if (onImage) {
      this.setImage(pictureElement, 0);
      this.showDetails(pictureElement);
      return;
    } else {
      this.hideDetails(pictureElement);
    }

    let angleDeg =
      (Math.atan2(cursorY - elementCenterY, cursorX - elementCenterX) * 180) /
      Math.PI;
    let withoutNegatives = angleDeg < 0 ? angleDeg + 360 : angleDeg;
    let corrected = (withoutNegatives + 15) % 360;

    let quotient = Math.floor(corrected / 30);
    let imageDirection = quotient + 1;

    this.setImage(pictureElement, imageDirection);
  };

  componentDidMount = () => {
    let teamMember1 = document.getElementById(styles.teamMember1);
    let teamMember2 = document.getElementById(styles.teamMember2);
    let teamMember3 = document.getElementById(styles.teamMember3);

    document.onmousemove = event => {
      let cursorX = event.pageX;
      let cursorY = event.pageY;

      this.setImageAccordingToMouse(cursorX, cursorY, teamMember1, [
        teamMember2,
        teamMember3,
      ]);
      this.setImageAccordingToMouse(cursorX, cursorY, teamMember2, [
        teamMember1,
        teamMember3,
      ]);
      this.setImageAccordingToMouse(cursorX, cursorY, teamMember3, [
        teamMember1,
        teamMember2,
      ]);
    };
  };

  render = () => (
    <section
      className={`text-center container lg:grid lg:grid-cols-12`}
      id={this.props.id}
    >
      <div className="lg:col-span-8 lg:col-start-3">
        <h2 className="text-5xl">The team behind nobt.io.</h2>
        <p className={'my-12'}>
          Crafted with <i className="fa fa-coffee" /> in Vienna.
        </p>
        <p>
          What started as a hackathon by three motivated developers soon turned
          out to be an actually helpful companion in our daily life. Nobt.io is
          our effort to share this idea with all of you. We hope you enjoy it as
          much as we do.
        </p>
      </div>

      <div
        className={'mt-8 md:grid md:grid-cols-3 lg:col-span-8 lg:col-start-3'}
      >
        <div className="m-auto my-3">
          <div className={`${styles.image}`} id={styles.teamMember1}>
            <div className={styles.imageDetailsWrapper}>
              <div className={styles.imageDetails}>
                <div>
                  <h3>Thomas</h3>
                  <ul>
                    <li>
                      <a
                        href="https://github.com/thomaseizinger"
                        target="_blank"
                      >
                        <i className="fa fa-github" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.xing.com/profile/Thomas_Eizinger"
                        target="_blank"
                      >
                        <i className="fa fa-xing-square" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/thomas-eizinger-b45a37144/"
                        target="_blank"
                      >
                        <i className="fa fa-linkedin-square" />
                      </a>
                    </li>
                    <li>
                      <a href="http://eizinger.io" target="_blank">
                        <i className="fa fa-home" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="m-auto my-3">
          <div className={styles.image} id={styles.teamMember2}>
            <div className={styles.imageDetailsWrapper}>
              <div className={styles.imageDetails}>
                <div>
                  <h3>David</h3>
                  <ul>
                    <li>
                      <a href="https://github.com/duffleit" target="_blank">
                        <i className="fa fa-github" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.xing.com/profile/David_Leitner4"
                        target="_blank"
                      >
                        <i className="fa fa-xing-square" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/david-leitner-7768a3136/"
                        target="_blank"
                      >
                        <i className="fa fa-linkedin-square" />
                      </a>
                    </li>
                    <li>
                      <a href="http://leitner.io" target="_blank">
                        <i className="fa fa-home" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="m-auto my-3">
          <div className={styles.image} id={styles.teamMember3}>
            <div className={styles.imageDetailsWrapper}>
              <div className={styles.imageDetails}>
                <div>
                  <h3>Matthias</h3>
                  <ul>
                    <li>
                      <a href="https://github.com/KreMat" target="_blank">
                        <i className="fa fa-github" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.xing.com/profile/Matthias_Kreuzriegler"
                        target="_blank"
                      >
                        <i className="fa fa-xing-square" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/mkreuzriegler/"
                        target="_blank"
                      >
                        <i className="fa fa-linkedin-square" />
                      </a>
                    </li>
                    <li>
                      <a href="http://kreuzriegler.at" target="_blank">
                        <i className="fa fa-home" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
