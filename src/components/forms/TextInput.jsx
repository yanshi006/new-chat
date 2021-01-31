import React from "react";
import TextField from '@material-ui/core/TextField';

const TextInput = (props) => {
  return (
    //material-uiのテキストフィールド
    <TextField
      fullWidth={true}
      margin={'dense'}
      //複数行のテキストの場合、multilineをtrueにする
      multiline={props.multiline}
      //行数を指定できる
      rows={props.rows}
      value={props.value}
      type={props.type}
      label={props.label}
      onChange={props.onChange}
    />
  )
}

export default TextInput;