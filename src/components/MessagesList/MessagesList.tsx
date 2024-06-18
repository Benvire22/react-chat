import React from 'react';
import {Message} from '../../types';
import MessageItem from './MessageItem/MessageItem';

interface Props {
  messages: Message[];
  isError: boolean;
}

const MessagesList: React.FC<Props> = ({messages, isError}) => {
  return (
    <div className="Mmessages-list overflow-auto border p-3 pb-1 mb-3" style={{height: 500}}>
      {messages.map((message) => (
        <MessageItem
          key={message.id + message.datetime}
          author={message.author}
          message={message.message}
          datetime={message.datetime}
        />
      ))}
      {isError ? <h3>Sorry, Error was occurred!</h3> : null}
    </div>
  );
};

export default MessagesList;