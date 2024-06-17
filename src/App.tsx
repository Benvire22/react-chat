import './App.css';
import SendForm from "./components/SendForm/SendForm";
import {useEffect, useState} from "react";
import {Message} from "./types";
import MessagesList from "./components/MessagesList/MessagesList";
const apiUrl = 'http://146.185.154.90:8000/messages?datetime=';

const App = () => {
    const [messagesData, setMessagesData] = useState<Message[]>([]);
    const [lastDate, setLastDate] = useState('');
    const [currentInterval, setCurrentInterval] = useState<boolean>(true);

    useEffect(() => {
        const interval = setInterval( async () => {
            const fetchRequest = async () => {
                const response = await fetch(apiUrl + lastDate);

                if (response.ok) {
                    const data: Message[] = await response.json();

                    if (messagesData.length === 0) {
                        setMessagesData(data);

                        if (data[data.length - 1].datetime && data[data.length - 1].datetime !== lastDate) {
                            setLastDate(data[data.length - 1].datetime);
                        }
                    } else if (data.length > 0) {
                        setMessagesData(prevState => {
                            if (data.length > 0) {
                                return [...prevState, ...data];
                            }
                            return [...prevState];
                        });

                        if (data[data.length - 1].datetime !== lastDate) {
                            setLastDate(data[data.length - 1].datetime);
                        }
                    }
                }
            };
            void fetchRequest();

        }, 3000);

        return () => {
            clearInterval(interval);
        }
    }, [currentInterval, lastDate]);

    const setMessage = async (author: string, message: string) => {
        setCurrentInterval(prevState => !prevState);

        const url = 'http://146.185.154.90:8000/messages';
        const data = new URLSearchParams();
        data.set('message', message);
        data.set('author', author);

        await fetch(url, {
            method: 'post',
            body: data,
        });
    };

    return (
        <div className='App'>
            <SendForm onSubmit={setMessage} />
            <MessagesList messages={messagesData} />
        </div>
    );
};

export default App;