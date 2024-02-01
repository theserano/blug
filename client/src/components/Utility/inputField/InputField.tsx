import styles from "./inputfield.module.scss"

interface InputTypes {
    label: string, 
    placeholder: string,
    text: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
  }

const InputField = ({label, placeholder, text , onChange}: InputTypes) => {
  
  return (
    <div className={styles.input_field_component}>
        <label
         htmlFor="text"
         className={styles.input_field_component_label}
         >{label}</label>
        <input
            id="text"
            type={text}
            placeholder={placeholder}
            className={styles.input_field_component_text}
            onChange={onChange}
         />
    </div>
  )
}

export default InputField;