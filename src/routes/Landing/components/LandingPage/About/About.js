import React from 'react';
import styles from './About.scss';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import RotatingText from 'react-rotating-text';

import StepOneImage from './step1.png';
import StepTwoImage from './step2.png';
import StepThreeImage from './step3.png';
import StartButton from '../StartButton';

export default class About extends React.Component {
  render = () => (
    <section className={styles.About} id={this.props.id}>
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <h2>
              You will{' '}
              <i className="fa fa-heart-o" style={{ color: '#d50000' }} />{' '}
              nobt.io
            </h2>

            <p className={styles.description}>
              Nobt.io is a free service that solves the tedious task of
              splitting several bills among your friends with ease.
            </p>
            <p className={styles.examples}>
              Try it for your{' '}
              <b>
                <RotatingText
                  cursor={false}
                  deletingInterval={25}
                  items={[
                    'next journey.',
                    'grill party.',
                    'shared flat.',
                    'holiday with friends.',
                    'after work beer.',
                  ]}
                />
              </b>
            </p>

            <StartButton active />

            <div className={styles.Steps}>
              <Row>
                <Col sm={4}>
                  <div className={styles.Counter}>
                    <span>1</span>
                  </div>
                  <h4>Create Nobt</h4>
                  <div>
                    <img src={StepOneImage} />
                  </div>
                </Col>
                <Col sm={4}>
                  <div className={styles.Counter}>
                    <span>2</span>
                  </div>
                  <h4>Add Friends</h4>
                  <div>
                    <img src={StepTwoImage} />
                  </div>
                </Col>
                <Col sm={4}>
                  <div className={styles.Counter}>
                    <span>3</span>
                  </div>
                  <h4>Split Bills</h4>
                  <div>
                    <img src={StepThreeImage} />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Grid>
    </section>
  );
}
