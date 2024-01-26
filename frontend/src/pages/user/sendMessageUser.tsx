import Button from "../../component/button";
import TextArea from "../../component/text-area";
import TextField from "../../component/text-field";

export default function SendMessageUser(){
    return(
        <form action="">
            <h2>Send Message User</h2>
            <TextField label="Subject" name="subject" type="text" />
            <TextArea label="Message" name="message" />
            <Button content="Send" />
        </form>
    )
}