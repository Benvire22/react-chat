import React from 'react';
import {Message} from "../../types";
import MessageItem from "./MessageItem/MessageItem";

interface Props {
    messages: Message[];
}

const MessagesList: React.FC<Props> = ({messages}) => {
    return (
        <div>
            {messages.map((message) => (
                <MessageItem
                    key={message.id + message.datetime}
                    author={message.author}
                    message={message.message}
                />
            ))}
        </div>
    );
};

export default MessagesList;