import {useEffect, useState} from 'react';
import {Message} from '../../types';
import MessagesList from '../../components/MessagesList/MessagesList';
import SendForm from '../../components/SendForm/SendForm';

const apiUrl = 'http://146.185.154.90:8000/messages?datetime=';

const ReactChat = () => {
  const [messagesData, setMessagesData] = useState<Message[]>([]);
  const [lastDate, setLastDate] = useState('');
  const [currentInterval, setCurrentInterval] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      setError(false);
      const fetchRequest = async () => {
        try {
          const response = await fetch(apiUrl + lastDate);

          if (response.ok) {
            const data: Message[] = await response.json();

            if (messagesData.length === 0) {
              setMessagesData(data);

              if (data[data.length - 1].datetime && data[data.length - 1].datetime !== lastDate) {
                setLastDate(data[data.length - 1].datetime);
              }
            } else if (data.length > 0) {
              setMessagesData(prevState => [...prevState, ...data]);

              if (data[data.length - 1].datetime !== lastDate) {
                setLastDate(data[data.length - 1].datetime);
              }

            }
          }
        } catch (e) {
          const result = (e as Error).message;
          clearInterval(interval);
          console.error('Error: ', result);
          setError(true);
        }
      };
      void fetchRequest();

    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentInterval, lastDate, messagesData.length]);

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
    <div className="ReactChat">
      <MessagesList messages={messagesData} isError={error}/>
      <SendForm onSubmit={setMessage}/>
    </div>
  );
};

export default ReactChat;