import React from 'react';
import styles from './Footer.scss';

import Logo from 'components/Logo';

export default class Footer extends React.Component {
  render = () => (
    <footer className={`${styles.footer}`}>
      <div className="md:grid md:grid-cols-2 container">
        <Logo isLink />
        <div className={styles.links}>
          <ul>
            <li>
              <a href="mailto:hello@nobt.io" target="_blank">
                <i className="fa fa-comment-o" /> Contact Us
              </a>
            </li>
            <li>
              <a href="https://twitter.com/nobtio">
                <i className="fa fa-twitter" /> Twitter
              </a>
            </li>
            <li>
              <a href="https://github.com/nobt-io">
                <i className="fa fa-github" /> Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
