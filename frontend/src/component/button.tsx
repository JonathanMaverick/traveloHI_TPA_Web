import styles from "../styles/components/button.module.scss"

export default function Button ({ content }: { content: string }){
    return(
        <button type="submit" className={styles['button']}>
            {content}
        </button>
    )
}