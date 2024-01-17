import { Link, useNavigate } from "react-router-dom";
import Button from "../../component/button";
import TextField from "../../component/text-field";
import useUser from "../../contexts/user-context";
import { FormEvent, useEffect, useState } from "react";
import { IUser } from "../../interfaces/user-interface";
import ReCAPTCHA from "react-google-recaptcha";
import { IOTP } from "../../interfaces/otp-interface";
import requestotp from "../../api/auth/requestotp";

export default function LoginPage(){

    const {login, loginotp} = useUser()
    const navigate = useNavigate()

    const USER_INITIAL_STATE:IUser = {
        email: "",
        password: "",
    };

    const USER_INITIAL_STATE_OTP:IOTP = {
        userEmail: "",
        otpValue: "",
    };

    useEffect(() => {
        document.title = 'Login';
      }, []);

    const [captchaValue, setCaptchaValue] = useState(null);
    const [user, setUser] = useState<IUser>(USER_INITIAL_STATE)
    const [otp, setOTP] = useState<IOTP>(USER_INITIAL_STATE_OTP)

    const handleOnSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!captchaValue){
            alert('Please complete the captcha');
            return;
        }

        if (!showOtp){
            const response = await login(user);
            if (response == 1){
                navigate('/');
            }
        }
        else{
            const response = await loginotp(otp);
            if (response == 1){
                navigate('/');
            }
        }
        
    }

    const onChange = (value: any) => {
        setCaptchaValue(value)
    }

    const [showOtp, setShowOtp] = useState(false);

    const openOTPmenu = () => {
        setShowOtp(!showOtp);
    };

    const handleRequestOTP = async () => {
        await requestotp(otp);
    };

    return(
        <form onSubmit={handleOnSubmit} className="register-login">
            <h1>Login</h1>
                {showOtp && (
                    <>
                        <TextField label="Email" name="email" type="text" value={otp?.userEmail || ''} onChange={(e:string)=> setOTP({...otp, userEmail: e})}/>
                        <TextField label="OTP" name="otp" type="text" value={otp?.otpValue || ''} onChange={(e:string)=> setOTP({...otp, otpValue: e})}/>        
                    </>
                ) || <>
                    <TextField label="Email" name="email" type="text" value={user?.email || ''} onChange={(e:string)=> setUser({...user, email: e})}/>
                    <TextField label="Password" name="password" type="password" value={user?.password || ''} onChange={(e:string)=> setUser({...user, password: e})}/>
                </>}
                <div className="recaptcha">
                    <ReCAPTCHA
                        sitekey="6Lf0tk8pAAAAAMhURN7Ka68VZPHCpR9Z3E-Bh_p2"
                        onChange={onChange}
                    />
                </div>
                {showOtp && (
                    <>
                        <button className="otp" type="button" onClick={openOTPmenu}>Use Password</button>
                        <button
                            className="otp"
                            type="button"
                            onClick={handleRequestOTP}
                        >
                            Request OTP Code
                        </button>
                    </>
                ) || (
                    <>
                        <button className="otp" type="button" onClick={openOTPmenu}>
                            Use OTP
                        </button>
                    </>
                )}

                <Button content="Login"/>
            <p><Link to="/">Forgot Password?</Link></p>
            <p>Don't have an account? <Link to="/register">Register Here</Link></p>
        </form>
    )
}