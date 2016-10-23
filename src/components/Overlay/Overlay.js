import React from "react";

import Visibility from "const/Visibility"

import styles from "./Overlay.scss";

const Overlay = React.createClass({

  componentWillMount(){
    this.setState({
      visibility: this.props.visibility
    })
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      visibility: nextProps.visibility
    })
  },

  getInitialState: function () {
    return {
      visibility: Visibility.HIDDEN
    }
  },

  open: function () {
    this.setState({
      visibility: Visibility.VISIBLE
    })
  },

  close: function () {
    this.setState({
      visibility: Visibility.HIDDEN
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

    let shouldBeVisible = this.state.visibility === Visibility.VISIBLE;

    return (
      <div>
        {shouldBeVisible && (
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
  /**
   * @type {bool} Indicates whether the overlay can be closed by clicking outside of the content.
   */
  closeable: React.PropTypes.bool,
  visibility: React.PropTypes.oneOf([Visibility.HIDDEN, Visibility.VISIBLE]).isRequired
};

Overlay.defaultProps = {
  closeable: true,
  visibility: Visibility.HIDDEN
};

export default Overlay;
