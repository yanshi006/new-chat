import React from "react";
import defaultDataset from "./dataset";
import './assets/styles/style.css';
import { AnswersList, Chats } from "./components/index";

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
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  //この関数は、質問をChatに追加している
  //nextQuestionId(defaultDatasetのinitなど = defaultDatasetのanswersの中のnextId)を引数に取る
  displayNextQuestion = (nextQuestionId) => {
    //現在(初期値)のchatsの値
    const chats = this.state.chats;
    chats.push({
      text: this.state.detaset[nextQuestionId].question,
      type: 'question'
    })
    this.setState({
      answers: this.state.detaset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    });
  }

  //この関数は、回答をChatに追加している
  //selectedAnswer(選択された回答{文字列})、nextQuestionId(defaultDatasetのinitなど)を引数に取る
  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'init'):
        //displayNextQuestion関数を実行している
        this.displayNextQuestion(nextQuestionId)
        break;
      default:
        //現在(初期値)のchatsの値
        const chats = this.state.chats;
        //現在(初期値)のchats(空の配列)にdetasetのanswersをpushしている
        chats.push({
          text: selectedAnswer,
          type: 'answer'
        });
        //現在(初期値)のchatsの値をpushした配列に書き変えている
        this.setState({
          chats: chats
        });

        //
        this.displayNextQuestion(nextQuestionId);
        break;
    }
  }

  //answersにdatasetから初期値の値(init)を入れ込む関数
  // initAnswer = () => {
  //   //初期状態はinitが入る
  //   const initDataset = this.state.detaset[this.state.currentId];
  //   const initAnswers = initDataset.answers;
  //   this.setState({
  //     answers: initAnswers
  //   });
  // }

  //chatsにdatasetから初期値の値(init)を入れ込む関数
  // initChats = () => {
  //   const initData = this.state.detaset[this.state.currentId];
  //datasetからquestionの値を取り出している
  // const chat = {
  //   text: initData.question,
  //   type: 'question'
  // };

  // //現在のchatsの値
  // const chats = this.state.chats;
  // //現在(初期値)のchats(配列)にdatasetのquestionをpushしている
  // chats.push(chat)
  // //現在(初期値)のchatsの値にpushした配列に書き変えている
  // this.setState({
  //   chats: chats
  // });
  // }

  //ライフサイクル（副作用）。初回のレンダーが終わった後にselectAnswer関数を実行する。
  componentDidMount() {
    const initAnswer = '';
    this.selectAnswer(initAnswer, this.state.currentId);
  }

  render() {
    return (
      <section className='c-section'>
        <div className='c-box'>
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
        </div>
      </section>
    );
  }
}
