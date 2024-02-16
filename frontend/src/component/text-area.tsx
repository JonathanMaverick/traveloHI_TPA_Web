import "../styles/components/text-area.scss";

interface ITextArea {
  label?: string;
  name: string;
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
}

export default function TextArea(props: ITextArea) {
  const { label, name, value, onChange, placeholder } = props;

  return (
    <div className='text-area'>
      <label>{label}</label>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
}
