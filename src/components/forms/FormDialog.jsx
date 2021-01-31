import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput';


export default class FormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      description: '',
      error: ''
    }
    this.inputName = this.inputName.bind(this);
    this.inputEmail = this.inputEmail.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  inputName = (e) => {
    this.setState({name: e.target.value})
  }
  inputEmail = (e) => {
    this.setState({email: e.target.value})
  }
  inputDescription = (e) => {
    this.setState({description: e.target.value})
  }
  submitForm = () => {
    const name = this.state.name;
    const email = this.state.email;
    const description = this.state.description;

  }
  handleSubmit = () => {
    if (this.state.name.trim() === '') {
      this.setState({error: 'お名前を入力してください。'})
    } else if (this.state.email.trim() === '') {
      this.setState({error: 'メールアドレスを入力してください。'})
    } else if (this.state.description.trim() === '') {
      this.setState({error: 'お問い合わせ内容を入力してください。'})
    }
  }
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
        <DialogContent onSubmit={this.handleSubmit}>
          <TextInput
            multiline={false}
            rows={1}
            value={this.state.name}
            type='name'
            label='お名前(必須)'
            error={this.state.error}
            onChange={this.inputName}
          />
          <TextInput
            multiline={false}
            rows={1}
            value={this.state.email}
            type='email'
            label='メールアドレス(必須)'
            error={this.state.error}
            onChange={this.inputEmail}
          />
          <TextInput
            multiline={true}
            rows={5}
            value={this.state.description}
            type='text'
            label='お問い合わせ内容(必須)'
            error={this.state.error}
            onChange={this.inputDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={this.submitForm} color="primary" autoFocus>
            送信する
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

