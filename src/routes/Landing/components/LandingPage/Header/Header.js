import React from 'react';
import styles from './Header.scss';
import BackgroundImage from './bg.jpg';
import ScreenImage from './screen.jpg';
import Device from './device.png';
import StartButton from '../StartButton';
import Logo from 'components/Logo';
import Scrollspy from 'react-scrollspy';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import AutoAffix from 'react-overlays/lib/AutoAffix';

export default class Header extends React.Component {
  render = () => (
    <header
      className={styles.header}
      style={{ backgroundImage: "url('" + BackgroundImage + "')" }}
    >
      <AutoAffix
        viewportOffsetTop={30}
        container={this}
        affixClassName={styles.affixScroll}
        bottomClassName={styles.affixScroll}
      >
        <div className={styles.affix}>
          <Grid>
            <Row>
              <Col sm={6}>
                <div className={styles.logo}>
                  <Logo isLink />
                </div>
              </Col>
              <Col sm={6}>
                <div className={styles.navbar}>
                  <Scrollspy
                    items={[
                      'section-about',
                      'section-features',
                      'section-team',
                    ]}
                    currentClassName="is-current"
                  >
                    <li>
                      <a href="#section-about">
                        <i className="fa fa-comment" aria-hidden="true" /> About
                      </a>
                    </li>
                    <li>
                      <a href="#section-features">
                        <i className="fa fa-star" aria-hidden="true" /> Features
                      </a>
                    </li>
                    <li>
                      <a href="#section-team">
                        <i className="fa fa-coffee" aria-hidden="true" /> Team
                      </a>
                    </li>
                  </Scrollspy>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </AutoAffix>
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
              <div
                className={styles.device}
                style={{ backgroundImage: "url('" + Device + "')" }}
              >
                <div className={styles.screen}>
                  <img src={ScreenImage} alt="" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </header>
  );
}
