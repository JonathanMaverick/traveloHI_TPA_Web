import "../styles/components/button.scss"

export default function Button ({ content }: { content: string }){
    return(
        <button type="submit" className="login-register-button">
            {content}
        </button>
    )
}