import { FormEvent, useEffect, useState } from "react"
import TextField from "../../component/text-field"
import Button from "../../component/button"
import '../../styles/pages/register-login.scss'
import ReCAPTCHA from "react-google-recaptcha";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../settings/firebase";
import register from "../../api/auth/register";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/user/user-interface";
import useTheme from "../../contexts/theme-context";

export default function RegisterPage(){
    const { theme } = useTheme();
    const USER_INITIAL_STATE:IUser = {
        email: "",
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        password: "",  
        subscribedToNewsletter: false,
        profilePicture: "",  
        personalSecurityAnswer: "",
        securityQuestion: "",
        status: "",  
        role: "",    
        wallet: 0     
    };

    useEffect(() => {
        if(user){
            navigate('/');
        }
        document.title = 'Register';
      }, []);

    const navigate = useNavigate();
    const [user, setUser] = useState<IUser>(USER_INITIAL_STATE);
    const [confPassword, setConfPassword] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [captchaValue, setCaptchaValue] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const validatePassword = (password:string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(password)

    const handleOnSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!profilePicture){
            alert("Please upload a profile picture")
            return
        }

        if(user.password !== confPassword){
            alert("Passwords do not match")
            return
        }

        if(validatePassword(user.password) === false){
            alert('Please insert a valid password');
            return;
        }

        if(captchaValue === null){
            alert('Please complete the captcha');
            return;
        }

        setIsLoading(true);
        const imageRef = ref(storage, `profile/${profilePicture.name}`);
        await uploadBytes(imageRef, profilePicture);
        user.profilePicture = await getDownloadURL(imageRef);

        const response = await register(user, captchaValue);
        if (response == 1){
            alert("Registration successful")
            setIsLoading(false);
            navigate('/login');
        }
        else{
            setIsLoading(false);
        }
    }

    const onChange = (value: any) => {
        setCaptchaValue(value)
    }

    return(
        <>
        <div className={`register-login-container ${theme === 'dark' ? 'dark-mode' : ''}`}>
            <form onSubmit={handleOnSubmit} className="register-login">
                <h1>Register</h1>
                <TextField 
                    label="Email" 
                    name="email" 
                    type="text" 
                    value={user.email || ''} 
                    onChange={(e:string)=> setUser({...user, email: e})}
                />
                
                <div className="name-container">
                    <div>
                        <label>First Name</label>
                        <input 
                        type="text" 
                        name="firstName" 
                        value={user.firstName|| ''}
                        onChange={(e)=> setUser({...user, firstName: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input 
                        type="text" 
                        name="lastName"
                        value={user.lastName|| ''}
                        onChange={(e)=> setUser({...user, lastName: e.target.value})}
                        />
                    </div>
                </div>

                <div className="text-field">
                    <label htmlFor="profile">Profile Picture</label>
                    <input
                        id="profile"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => {
                            setProfilePicture(e.target.files![0]);
                        }}
                    />
                </div>

                <TextField 
                    label="DOB" 
                    name="dob" 
                    type="date"
                    value={user.dob || ''}
                    onChange={(e:string)=> setUser({...user, dob: e})}
                />
                
                <div className="gender-container">
                    <p>Gender</p>
                    <div className="gender-option">
                        <div className="gender-box">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="Male"
                                checked={user.gender === 'Male'}
                                onChange={(e)=>setUser({ ...user, gender: e.target.value })}
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className="gender-box">
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="Female"
                                checked={user.gender === 'Female'}
                                onChange={(e)=>setUser({ ...user, gender: e.target.value })}
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                </div>

                <label id="label-security-question" htmlFor="securityQuestion">Select a security question:</label>
                <select
                    value={user.securityQuestion}
                    onChange={(event) => setUser({ ...user, securityQuestion: event.target.value })}
                    id="security-question"
                    name="securityQuestion"
                >
                    <option value="What is your favorite childhood pet's name?">What is your favorite childhood pet's name?</option>
                    <option value="In which city were you born?">In which city were you born?</option>
                    <option value="What is the name of your favorite book or movie?">What is the name of your favorite book or movie?</option>
                    <option value="What is the name of the elementary school you attend?">What is the name of the elementary school you attend?</option>
                    <option value="What is the model of your first car?">What is the model of your first car?</option>
                </select>
                <TextField 
                    label="Security Answer" 
                    name="securityAnswer" 
                    type="text"
                    value={user.personalSecurityAnswer || ''}
                    onChange={(e:string)=> setUser({...user, personalSecurityAnswer: e})}
                />
                <TextField 
                    label="Password" 
                    name="password" 
                    type="password"
                    value={user.password || ''}
                    onChange={(e:string)=> setUser({...user, password: e})}
                />
                <TextField 
                    label="Confirm Password" 
                    name="confirmPassword" 
                    type="password"
                    value={confPassword}
                    onChange={(setConfPassword)}
                />
                <div className="subscribe-container">
                    <input 
                        type="checkbox" 
                        id="subscribe" 
                        name="subscribe" 
                        value="Subscribe"
                        checked={user.subscribedToNewsletter} 
                        onChange={(e) => setUser({ ...user, subscribedToNewsletter: e.target.checked })}
                    />
                    <label htmlFor="subscribe"> Subscribe to newsletter </label>
                </div>
                <div className="recaptcha">
                    <ReCAPTCHA
                        sitekey="6Lf0tk8pAAAAAMhURN7Ka68VZPHCpR9Z3E-Bh_p2"
                        onChange={onChange}
                    />
                </div>
                
                <Button content="Register" isLoading={isLoading} />
                <p>Already have an account? <Link to="/login">Login Here</Link></p>
            </form>
        </div>
        </>
    )
}