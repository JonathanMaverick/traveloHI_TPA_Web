import style from "../styles/text-field.module.css"

interface ITextField{
    label : string,
    name : string,
    type?: string,
}

export default function TextField (props : ITextField){
    const {label, name, type} = props;
    
    return(
        <div className={style.text_field}>
            <label>{label}</label>
            <input type={type} name={name}/>
        </div>
    )
}