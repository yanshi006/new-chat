import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Koko from '../assets/img/koko.jpg';
import Maru from '../assets/img/maru.JPG';


const Chat = (props) => {
  //props.typeがquestionであったら、isQuestionに真偽値が入る。
  const isQuestion = (props.type === 'question');

  const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';

  return (
    <ListItem className={classes}>
      <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt="icon" src={Koko} />
        ) : (
            <Avatar alt="icon" src={Maru} />
          )}
      </ListItemAvatar>
      <div className="p-chat__bubble">
        {props.text}
      </div>
    </ListItem>
  )
}

export default Chat;