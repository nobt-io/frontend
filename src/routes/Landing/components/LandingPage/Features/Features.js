import React from 'react';
import styles from './Features.scss';

export default class Features extends React.Component {
  render = () => (
    <section className={styles.features} id={this.props.id}>
      <div className="md:grid md:grid-cols-3 container">
        <div>
          <div className={styles.feature}>
            <div className={styles.icon}>
              <i className="fa fa-dashboard" />
            </div>
            <FeatureHeading name={'Easy to use'} />
            <p>
              Nobt.io works without registration. Simply create a nobt and share
              the link with your friends.
            </p>
          </div>
        </div>
        <div>
          <div className={styles.feature}>
            <div className={styles.icon}>
              <i className="fa fa-cloud" />
            </div>
            <FeatureHeading name={'Available Everywhere'} />
            <p>
              Nobts are stored in the cloud, so you can access them from any
              device, anytime, no matter where you are.
            </p>
          </div>
        </div>
        <div>
          <div className={styles.feature}>
            <div className={styles.icon}>
              <a href={'https://github.com/nobt-io'}>
                <i className="fa fa-github" />
              </a>
            </div>
            <FeatureHeading name={'Open Source'} />
            <p>
              We believe that the Web should be open that's why we share
              everything about nobt.io, except your data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureHeading({ name }) {
  return <h3 className="text-4xl my-6">{name}</h3>;
}
