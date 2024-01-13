import { useNavigate } from "react-router-dom";
import Button from "../../component/button";
import TextField from "../../component/text-field";
import useUser from "../../contexts/user-context";
import { FormEvent } from "react";

export default function LoginPage(){

    const {login} = useUser()
    const navigate = useNavigate()

    const handleOnSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {username, password} = e.currentTarget
        if (login(username.value, password.value)){
            navigate('/')
        }
    }

    return(
        <form onSubmit={handleOnSubmit}>
            <div>
                {/* <TextField label="Username" name="username" type="text"/>
                <TextField label="Password" name="password" type="password"/> */}
                <Button content="Login" />
            </div>
        </form>
    )
}