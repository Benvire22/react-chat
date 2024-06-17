import React from 'react';

interface Props {
    author: string;
    message: string;
}

const MessageItem: React.FC<Props> = ({author, message}) => {
    return (
        <div>
            <span>Author: {author}</span>
            <p>Message: {message}</p>
        </div>
    );
};

export default MessageItem;