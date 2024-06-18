import React from 'react';

interface Props {
  author: string;
  message: string;
  datetime: string;
}

const MessageItem: React.FC<Props> = ({author, message, datetime}) => {
  const date = new Date(datetime),
    dFormat = [
          date.getDate(),
          date.getMonth()+1,
          date.getFullYear()].join('/') + ' ' +
        [date.getHours(),
          date.getMinutes(),
          date.getSeconds()].join(':');

  return (
    <div>
      <span>Author: {author}. {dFormat}</span>
      <p>Message: {message}</p>
    </div>
  );
};

export default MessageItem;