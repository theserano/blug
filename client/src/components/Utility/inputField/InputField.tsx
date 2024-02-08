import styles from "./inputfield.module.scss"

interface InputTypes {
    id: string,
    label: string, 
    labelId: string,
    placeholder: string,
    text: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
  }

const InputField = ({label, placeholder, text, labelId, id , onChange}: InputTypes) => {
  
  return (
    <div className={styles.input_field_component}>
        <label
         htmlFor={labelId}
         className={styles.input_field_component_label}
         >{label}</label>
        <input
            id={id}
            type={text}
            placeholder={placeholder}
            className={styles.input_field_component_text}
            onChange={onChange}
         />
    </div>
  )
}

export default InputField;