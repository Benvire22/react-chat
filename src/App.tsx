import './App.css';
import SendForm from "./components/SendForm/SendForm";
import {useState} from "react";
import {Message} from "./types";
const apiUrl = 'http://146.185.154.90:8000/messages?datetime=';

const App = () => {
    const [messagesData, setMessagesData] = useState<Message[]>([]);

    const setMessage = (author: string, message: string) => {
        console.log(author, message);
    };

    return (
        <div className='App'>
            <SendForm onSubmit={setMessage} />
        </div>
    );
};

export default App;