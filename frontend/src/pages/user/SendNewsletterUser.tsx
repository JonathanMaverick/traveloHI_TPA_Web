import { FormEvent, useState } from "react";
import Button from "../../component/button";
import TextArea from "../../component/text-area";
import TextField from "../../component/text-field";
import { IMessage } from "../../interfaces/user/message-interface";
import send_newsletter from "../../api/user/send_newsletter";

export default function SendNewsletterUser(){

    const MESSAGE_INITIAL_STATE : IMessage = {
        subject: "",
        message: "",
    };

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<IMessage>(MESSAGE_INITIAL_STATE);
    const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const response = await send_newsletter(message);
        if(response == -1){
            setLoading(false);
            return;
        }
        else{
            alert("Message sent!")
            setMessage(MESSAGE_INITIAL_STATE);
            setLoading(false);
            window.location.reload();
        }
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
            <Button content="Send" isLoading={loading}/>
        </form>
    )
}