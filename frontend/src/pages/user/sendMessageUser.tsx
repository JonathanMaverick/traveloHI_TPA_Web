import { FormEvent, useState } from "react";
import Button from "../../component/button";
import TextArea from "../../component/text-area";
import TextField from "../../component/text-field";
import { IMessage } from "../../interfaces/user/message-interface";
import send_newsletter from "../../api/user/send_newsletter";

export default function SendMessageUser(){

    const MESSAGE_INITIAL_STATE : IMessage = {
        subject: "",
        message: "",
    };

    const [message, setMessage] = useState<IMessage>(MESSAGE_INITIAL_STATE);
    const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const reponse = await send_newsletter(message);
    }

    return(
        <form onSubmit={handleMessageSubmit}>
            <h2>Send Message User</h2>
            <TextField 
                label="Subject" 
                name="subject" 
                type="text"
                onChange={(e: string) => setMessage({...message, subject: e})}
            />
            <TextArea
                label="Message" 
                name="message" 
                onChange={(e: string) => setMessage({...message, message: e})}
            />
            <Button content="Send" />
        </form>
    )
}