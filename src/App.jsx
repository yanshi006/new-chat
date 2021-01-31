import React from "react";
import defaultDataset from "./dataset";
import './assets/styles/style.css';
import { AnswersList, Chats } from "./components/index";
import FormDialog from "./components/forms/FormDialog";

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
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
        setTimeout(() => {
          this.displayNextQuestion(nextQuestionId)
        }, 500);
        break;
        case (nextQuestionId === 'contact'):
          // this.setState({open: true});
          this.handleClickOpen();
          break;
      //正規表現で調べる
      //^は文字列の先頭を指定する。
      //*はその後はなんでもいいよみたいなやつ
      //nextQuestionIdの中で、正規表現で調べた値の場合
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
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

        //1秒遅れて返信を返している
        setTimeout(() => {
          this.displayNextQuestion(nextQuestionId);
        }, 1000);
        break;
    }
  }

  //ダイアログを開く関数
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  //ダイアログを閉じる関数
  handleClose = () => {
    this.setState({ open: false });
  };


  //ライフサイクル（副作用）。初回のレンダーが終わった後にselectAnswer関数を実行する。
  componentDidMount() {
    const initAnswer = '';
    this.selectAnswer(initAnswer, this.state.currentId);
  }

  //ライフサイクル（副作用）。初回のレンダーが終わり、その後何かstateが更新されたら、必ずcomponentDidUpdateが呼び出される。自動にスクロールをしてくれる機能
  componentDidUpdate() {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      //この書き方をすると、自動的にスクロールされる
      scrollArea.scrollTop = scrollArea.scrollHeight
    };
  }

  render() {
    return (
      <section className='c-section'>
        <div className='c-box'>
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
          <FormDialog open={this.state.open} handleClose={this.handleClose} />
        </div>
      </section>
    );
  }
}
