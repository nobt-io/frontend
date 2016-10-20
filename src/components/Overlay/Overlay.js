import React from "react";
import styles from "./Overlay.scss";

const Overlay = React.createClass({

  getInitialState: function () {
    return {
      open: false
    }
  },

  open: function () {
    this.setState({
      open: true
    })
  },

  close: function () {
    this.setState({
      open: false
    });
  },

  closeIfOutsideOfContent(e) {
    const classesOfClickedElement = e.target.className.split(' ');

    var overlayClass = styles.overlay;
    var sectionClass = styles.contentSection;

    var isOutsideOfContent = classesOfClickedElement.indexOf(overlayClass) !== -1 || classesOfClickedElement.indexOf(sectionClass) !== -1;

    if (isOutsideOfContent && this.props.closeable) {
      this.close();
    }
  },

  render: function () {
    return (
      <div>
        {this.state.open && (
          <div className={styles.overlay} onClick={this.closeIfOutsideOfContent}>
            <div className={styles.contentSection}>
              <div className={styles.contentContainer}>
                {this.props.children}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
});

Overlay.propTypes = {
  closeable: React.PropTypes.bool,
  header: React.PropTypes.element
};

Overlay.defaultProps = {
  closeable: true,
  header: null
};

export default Overlay;
