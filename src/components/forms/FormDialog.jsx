import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput';


const FormDialog = ({ open, handleClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setdDescription] = useState('');

  //入力された名前を取っている
  const inputName = (e) => {
    setName(e.target.value)
  }

  //入力されたメールアドレスを取っている
  const inputEmail = (e) => {
    setEmail(e.target.value)
  }

  //入力されたお問い合わせ内容を取っている
  const inputDescription = (e) => {
    setdDescription(e.target.value)
  }
  //送信する内容
  const submitForm = () => {
    const createName = name;
    const createEmail = email;
    const createDescription = description;

    //送信する値
    const payload = {
      text: 'お問い合わせがありました\n' +
        'お名前：' + createName + '\n' +
        'メールアドレス：' + createEmail + '\n' +
        'お問い合わせ内容：\n' + createDescription + '\n'
    }
    //Incoming WebHooksのurlどこのチャンネルに送信するのか
    const url = '';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(() => {
      alert('送信が完了しました。');
      //フォームの値をリセットしている
      setName('');
      setEmail('');
      setdDescription('');
      //フォームを閉じている
      return handleClose();
    })
  }

  // handleSubmit = () => {
  //   if (this.state.name.trim() === '') {
  //     this.setState({ error: 'お名前を入力してください。' })
  //   } else if (this.state.email.trim() === '') {
  //     this.setState({ error: 'メールアドレスを入力してください。' })
  //   } else if (this.state.description.trim() === '') {
  //     this.setState({ error: 'お問い合わせ内容を入力してください。' })
  //   }
  // }

  return (
    //material-uiのダイアログ
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
      <DialogContent>
        <TextInput
          multiline={false}
          rows={1}
          value={name}
          type='name'
          label='お名前(必須)'
          onChange={inputName}
        />
        <TextInput
          multiline={false}
          rows={1}
          value={email}
          type='email'
          label='メールアドレス(必須)'
          onChange={inputEmail}
        />
        <TextInput
          multiline={true}
          rows={5}
          value={description}
          type='text'
          label='お問い合わせ内容(必須)'
          onChange={inputDescription}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          キャンセル
          </Button>
        <Button onClick={submitForm} color="primary" autoFocus>
          送信する
          </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog