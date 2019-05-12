import LandingPageRouteFactory from './Landing';
import { Switch } from 'react-router-dom';
import React from 'react';
import CreateNobtRouteFactory from './CreateNobt/index';
import AppRouteFactory from './App/index';
import { WindowScroller } from 'react-scroll-manager';

export default store => (
  <WindowScroller>
    <Switch>
      {LandingPageRouteFactory(store)}
      {CreateNobtRouteFactory(store)}
      {AppRouteFactory(store)}
    </Switch>
  </WindowScroller>
);
