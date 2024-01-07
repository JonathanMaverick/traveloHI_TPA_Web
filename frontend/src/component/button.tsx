import styles from "../styles/components/button.module.scss"

export default function Button(){
    return(
        <button type="submit" className={styles['button']}>
            Button
        </button>
    )
}