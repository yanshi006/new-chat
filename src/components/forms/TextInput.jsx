import React from "react";
import TextField from '@material-ui/core/TextField';

const TextInput = ({multiline,rows,value,type,label,onChange}) => {
  return (
    //material-uiのテキストフィールド
    <TextField
      fullWidth={true}
      margin={'dense'}
      //複数行のテキストの場合、multilineをtrueにする
      multiline={multiline}
      //行数を指定できる
      rows={rows}
      value={value}
      type={type}
      label={label}
      onChange={onChange}
    />
  )
}

export default TextInput;