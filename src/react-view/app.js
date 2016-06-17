

'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Route, Router, browserHistory, run} from 'react-router'
import rootRoute from './routes'

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('react')
)
