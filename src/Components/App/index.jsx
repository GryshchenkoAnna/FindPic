import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
import Header from '../Header';

const Content = styled.div``;

class App extends Component {
  state = {
    favorite: [],
    isActiveApp: true,
    // some: good,
  };

  render() {
    const { favorite, isActiveApp } = this.state;
    console.log(favorite);

    return (
      <div className="App">
        <Header isActiveApp={isActiveApp} />
        <Content />
      </div>
    );
  }
}

export default hot(module)(App);
