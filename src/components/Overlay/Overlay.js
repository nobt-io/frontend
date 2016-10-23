import React from "react";

import Visibility from "const/Visibility"

import styles from "./Overlay.scss";

const handleOnOverlayClick = (clickEvent, props) => {
  const classesOfClickedElement = clickEvent.target.className.split(' ');

  var overlayClass = styles.overlay;
  var sectionClass = styles.contentSection;

  var isOutsideOfContent = classesOfClickedElement.indexOf(overlayClass) !== -1 || classesOfClickedElement.indexOf(sectionClass) !== -1;

  if (isOutsideOfContent) {
    props.onClickOutside();
  }
};

const Overlay = (props) => (
  <div>
    {props.visibility === Visibility.VISIBLE && (
      <div className={styles.overlay} onClick={(event) => handleOnOverlayClick(event, props)}>
        <div className={styles.contentSection}>
          <div className={styles.contentContainer}>
            {props.children}
          </div>
        </div>
      </div>
    )}
  </div>
);

Overlay.propTypes = {
  visibility: React.PropTypes.oneOf([Visibility.HIDDEN, Visibility.VISIBLE]).isRequired,
  onClickOutside: React.PropTypes.func,
};

Overlay.defaultProps = {
  onClickOutside: () => { }
};

export default Overlay;
