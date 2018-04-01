import React from "react";
import styles from "./Footer.scss";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import Logo from "components/Logo/index";

export default class Footer extends React.Component {
  render = () => (
    <footer className={styles.footer}>
      <Grid>
        <Row>
          <Col md={6}>
            <Logo isLink/>
          </Col>
          <Col md={6}>
            <div className={styles.links}>
              <ul>
                <li><a href="mailto:hello@nobt.io" target="_blank"><i className="fa fa-comment-o"></i> Contact Us</a></li>
                <li><a href="https://twitter.com/nobtio"><i className="fa fa-twitter"></i> Twitter</a></li>
                <li><a href="https://github.com/nobt-io"><i className="fa fa-github"></i> Github</a></li>
              </ul>
            </div>
          </Col>
        </Row>
      </Grid>
    </footer>
  )
}
