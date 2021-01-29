import React from "react";
import defaultDataset from "./dataset";
import './assets/styles/style.css';
import { AnswersList } from "./components/index";

export default class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    answers: [],
    chats: [],
    currentId: 'init',
    detaset: defaultDataset,
    open: false
  }
}

//answersにdatasetを入れ込む関数
initAnswer = () => {
  //初期状態はinitが入る
  const initDataset = this.state.detaset[this.state.currentId];
  const initAnswers = initDataset.answers;
    this.setState({
    answers: initAnswers
  })
}

//ライフサイクル（副作用）。初回のレンダーが終わった後にinitAnswer関数を実行する。
componentDidMount() {
  this.initAnswer()
}

  render() {
    return (
      <section className='c-section'>
        <div className='c-box'>
          <AnswersList answers={this.state.answers} />
        </div>
      </section>
    );
  }
}
