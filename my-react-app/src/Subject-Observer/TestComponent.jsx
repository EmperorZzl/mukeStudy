
import React, { Component } from 'react';
import Observer from './Observer';
import Subject from './Subject';

export default class TestComponent extends Component {
  constructor(props) {
    super(props);
    console.log("::::::")
  }
  componentDidMount() {
    let subject = new Subject();
    let observer = new Observer();
    observer.update = () => {
      console.log('>>>> observer.update');
    }
    observer.subscibeTo(subject)
    subject.notify();
  }



  render() {
    return <div>999</div>
  }
}