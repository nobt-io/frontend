import React from 'react';
import styles from './Header.scss';
import BackgroundImage from './bg.jpg';
import ScreenImage from './screen.jpg';
import Device from './device.png';
import StartButton from '../StartButton';
import Logo from 'components/Logo';
import Scrollspy from 'react-scrollspy';
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
          <div className="grid grid-cols-2 container">
            <div className={styles.logo}>
              <Logo isLink />
            </div>
            <div className={styles.navbar}>
              <Scrollspy
                items={['section-about', 'section-features', 'section-team']}
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
          </div>
        </div>
      </AutoAffix>
      <div className="sm:grid sm:grid-cols-12 container">
        <div className="sm:col-span-7">
          <div className={styles.content}>
            <div>
              <h1>split your bills</h1>
              <h1 className={styles.handwritten}>with ease</h1>
              <StartButton data-cy="start-button" />
            </div>
          </div>
        </div>
        <div className="sm:col-span-5">
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
        </div>
      </div>
    </header>
  );
}
