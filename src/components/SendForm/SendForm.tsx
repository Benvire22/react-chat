import React, {useState} from 'react';

interface Props {
    onSubmit: (author: string, message: string) => void;
}

interface FormData {
    author: string;
    message: string;
}

const SendForm: React.FC<Props> = ({onSubmit}) => {
    const [formData, setFormData] = useState<FormData>({
        author: '',
        message: ''
    });

    const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData.author, formData.message);
        setFormData({
            author: '',
            message: ''
        });
    };

    const changeFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormData(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    return (
        <form onSubmit={sendForm}>
            <div>
                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    name="author"
                    id="author"
                    value={formData.author}
                    onChange={changeFormData}
                    required
                />
            </div>
            <div>
                <label htmlFor="message">message</label>
                <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={changeFormData}
                    required
                ></textarea>
            </div>
            <button type="submit">Send</button>
        </form>
    );
};

export default SendForm;