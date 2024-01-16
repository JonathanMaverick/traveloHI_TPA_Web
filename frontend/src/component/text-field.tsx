import "../styles/components/text-field.scss"

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
        <div className='text-field'>
            <label>{label}</label>
            <input type={type} name={name} value ={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}