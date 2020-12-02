

import React, { Component } from 'react';

export default class Subject extends React.Component {
  observers = [];
  addObserver = (observer) => {
    this.observers.push(observer);
  }
  removeObserver = (observer) => {
    let index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  notify = () => {
    this.observers.forEach(observer => {
      observer.update();
    })
  }
  componentDidMount() {

  }

}



