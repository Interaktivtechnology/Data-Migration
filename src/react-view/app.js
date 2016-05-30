'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Route, Router, browserHistory, run} from 'react-router'
import rootRoute from './routes'


render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('react')
)
