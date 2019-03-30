import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import * as actions from '../actions';

import Landing from './generalComponent/Landing';
import LoginPage from './generalComponent/LoginPage';
import Dashboard from './generalComponent/Dashboard';
import Header from './generalComponent/Header';

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route path="/user" component={Dashboard} />
            <Route path="/login" component={LoginPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);