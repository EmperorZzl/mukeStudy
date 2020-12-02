
import Subject from './Subject';
export default class Observer {
  update = () => { }
  subscibeTo = (subject ) => {
    subject.addObserver(this);
  }
}