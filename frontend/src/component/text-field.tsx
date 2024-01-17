import "../styles/components/text-field.scss"

interface ITextField{
    label : string
    name : string
    type?: string
    onChange?: any
    value ?: string
    placeholder?: string
}

export default function TextField (props : ITextField){
    const {label, name, type, value, onChange, placeholder} = props;
    
    return(
        <div className='text-field'>
            <label>{label}</label>
            <input type={type} name={name} value ={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}