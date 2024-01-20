import "../styles/components/button.scss"

interface IButton {
    content: string;
    isLoading?: boolean;
}

export default function Button ( props: IButton){
    const { content, isLoading } = props;

    return(
        <button type="submit" className="login-register-button" disabled={isLoading}>
            {isLoading ? 'Loading...' : content}
        </button>
    )
}