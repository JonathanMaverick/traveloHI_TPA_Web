import { FormEvent, useEffect, useState } from 'react';
import TextField from '../../component/text-field';
import '../../styles/pages/register-login.scss'
import Button from '../../component/button';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../../interfaces/user-interface';
import axios from 'axios';

const ForgetPassPage = () => {

    useEffect(() => {
        document.title = 'Forgot Password';
      }
    , []);

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState(''); 
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload: IUser = {
            email: email,
        };
        
        try{
            const response = await axios.post(import.meta.env.VITE_API_URL + '/user/get-user-security-question/',payload);
            const result = response.data;
            setSecurityQuestion(result)
            setStep(2);
            setError('');
        }catch(error: any){
            setError(error.response.data)
        }

    };

    const handleSecurityQuestionSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        const payload: IUser = {
            email: email,
            personalSecurityAnswer: securityAnswer,
        };
        try{
            await axios.post(import.meta.env.VITE_API_URL + '/user/validate-security-question/', payload);
            setStep(3);
            setError('');
        }catch(error: any){
            setError(error.response.data)
        }
    };

    const handlePasswordSubmit = async (e : FormEvent<HTMLFormElement>) => {
        setError('');
        e.preventDefault();
        const payload: IUser = {
            email: email,
            password: newPassword,        
        };
        try{
            const respond = await axios.post(import.meta.env.VITE_API_URL + '/user/change-password/', payload)
            console.log(respond)
            alert('Password changed successfully!')
            navigate('/login')
        }catch(error: any){
            setError(error.response.data)
            return;
        }
    };

    const renderStep = () => {
        switch (step) {
        case 1:
            return (
            <form onSubmit={handleEmailSubmit}>
                <TextField label="Email" name="email" type="text" value={email} onChange={(e:string)=> setEmail(e)}/>
                <Button content="Next"/>
            </form>
            );
        case 2:
            return (
            <form onSubmit={handleSecurityQuestionSubmit}>
                <TextField label={securityQuestion} name="securityQuestion" type="text" value={securityAnswer} onChange={(e:string)=> setSecurityAnswer(e)}/>
                <Button content="Next"/>
            </form>
            );
        case 3:
            return (
            <form onSubmit={handlePasswordSubmit}>
                <TextField label="New Password" name="newPassword" type="password" value={newPassword} onChange={(e:string)=> setNewPassword(e)}/>
                <Button content="Submit"/>
            </form>
            );
        default:
            return null;
        }
    };

    return (
        <div className='register-login'>
            <h1>Forgot Password</h1>
            {renderStep()}
            <p style={{color: "red"}}>{error}</p>
            <p><Link to="/login">Back to login page?</Link></p>
        </div>
    );
};

export default ForgetPassPage;
