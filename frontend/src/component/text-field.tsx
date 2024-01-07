import styles from "../styles/components/text-field.module.scss"

interface ITextField{
    label : string,
    name : string,
    type?: string,
}

export default function TextField (props : ITextField){
    const {label, name, type} = props;
    
    return(
        <div className={styles['text-field']}>
            <label>{label}</label>
            <input type={type} name={name}/>
        </div>
    )
}