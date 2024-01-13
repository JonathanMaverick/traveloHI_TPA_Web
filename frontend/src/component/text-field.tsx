import styles from "../styles/components/text-field.module.scss"

interface ITextField{
    label : string
    name : string
    type?: string
    onChange: any
    value : string
}

export default function TextField (props : ITextField){
    const {label, name, type, value, onChange} = props;
    
    return(
        <div className={styles['text-field']}>
            <label>{label}</label>
            <input type={type} name={name} value ={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}