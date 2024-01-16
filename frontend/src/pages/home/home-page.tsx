import useUser from "../../contexts/user-context";

export default function HomePage(){
    const {user} = useUser();
    
    return(
        <div>
            <h1>Home Page</h1>
            {user && <p>Welcome {user.firstName}</p>}
        </div>
    )
}