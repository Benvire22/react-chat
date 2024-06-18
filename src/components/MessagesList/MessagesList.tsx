import React from 'react';
import {Message} from '../../types';
import MessageItem from './MessageItem/MessageItem';


interface Props {
  messages: Message[];
  isError: boolean;
}

const MessagesList: React.FC<Props> = ({messages, isError}) => {
  return (
    <div>
      {messages.map((message) => (
        <MessageItem
          key={message.id + message.datetime}
          author={message.author}
          message={message.message}
          datetime={message.datetime}
        />
      ))}
      {isError ? <h3>Sorry, Error was occured!</h3> : null}
    </div>
  );
};

export default MessagesList;