import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';

export default () => <Route exact path={'/'} component={LandingPage} />;
