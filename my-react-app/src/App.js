import './App.css';
import MyPromise from './MyPromise/MyPromise';
import React, { useState, useEffect } from 'react';
import TestComponent from './Subject-Observer/TestComponent'

function App() {
  //做饭
  const cook = () => {
    console.log('开始做饭。');
    var p = new Promise(function (resolve, reject) {        //做一些异步操作
      setTimeout(function () {
        console.log('做饭完毕！');
        resolve('鸡蛋炒饭');
      }, 1000);
    });
    return p;
  }
  //吃饭
  const eat = (data) => {
    console.log('开始吃饭：' + data);
    var p = new Promise(function (resolve, reject) {        //做一些异步操作
      setTimeout(function () {
        console.log('吃饭完毕!');
        resolve('一块碗和一双筷子,结束');
      }, 2000);
    });
    return p;
  }
  //promise测试
  useEffect(() => {
    cook()
      .then(eat).then((result) => { console.log(result) });

  }, [])
  useEffect(() => {
  }, [])
  return (
    <div className="App" onClick={() => {
      const myPromise = new MyPromise(function (resolve, reject) {
        resolve('resolve-1')
      });
      myPromise.then(function (value) {
        console.log('resolved.>>>>>>> ', value);
      });
    }}>
      88
      <TestComponent></TestComponent>
    </div>
  );
}

export default App;



