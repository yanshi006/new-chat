import React, { useCallback, useEffect, useState } from "react";
import defaultDataset from "./dataset";
import './assets/styles/style.css';
import { AnswersList, Chats } from "./components/index";
import FormDialog from "./components/forms/FormDialog";

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState('init');
  const [open, setOpen] = useState(false);
  const detaset = defaultDataset;

  //この関数は、質問をChatに追加している
  //nextQuestionId(defaultDatasetのinitなど = defaultDatasetのanswersの中のnextId)を引数に取る
  const displayNextQuestion = (nextQuestionId) => {
    addChats({
      text: detaset[nextQuestionId].question,
      type: 'question'
    });
    setAnswers(detaset[nextQuestionId].answers);
    setCurrentId(nextQuestionId);
  }

  //この関数は、回答をChatに追加している
  //selectedAnswer(選択された回答{文字列})、nextQuestionId(defaultDatasetのinitなど)を引数に取る
  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'init'):
        //displayNextQuestion関数を実行している
        setTimeout(() => {
          //initの場合だから引数が'init'でも大丈夫だった。
          //初めはuseEffectによって、stateのcurrentIdが入れられている
          displayNextQuestion(nextQuestionId)
        }, 500);
        break;
      case (nextQuestionId === 'contact'):
        handleClickOpen();
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
        addChats({
          text: selectedAnswer,
          type: 'answer'
        });
        //1秒遅れて返信を返している
        setTimeout(() => {
          displayNextQuestion(nextQuestionId);
        }, 1000);
        break;
    }
  }
  //引数のchatは受け取るオブジェクト
  //setChatsの引数は前のstate(chatsの状態)を受け取ることができる
  //returnで前のstate(chats)を展開し、新しく受け取ったオブジェクトを入れている
  const addChats = (chat) => {
    setChats((prevChats) => {
      return [...prevChats, chat]
    })
  }

  //ダイアログを開く関数
  const handleClickOpen = () => {
    setOpen(true)
  };

  //ダイアログを閉じる関数
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen])


  //ライフサイクル（副作用）。初回のレンダーが終わった後にselectAnswer関数を実行する。
  //外部(useEffectの外)の関数や値を使っているからエラーが出ている。依存関係
  useEffect(() => {
      const initAnswer = '';
      selectAnswer(initAnswer, currentId);
  }, []);

  //ライフサイクル（副作用）。初回のレンダーが終わり、その後何かstateが更新されたら、必ずcomponentDidUpdateが呼び出される。自動にスクロールをしてくれる機能
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      //この書き方をすると、自動的にスクロールされる
      scrollArea.scrollTop = scrollArea.scrollHeight
    };
  });

  return (
    <section className='c-section'>
      <div className='c-box'>
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
}

export default App