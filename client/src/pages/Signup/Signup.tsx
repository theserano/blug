import styles from "./signup.module.scss";
import "../../styles/_generic.scss"
import logo from "../../assets/heart.svg";
import InputField from "../../components/Utility/inputField/InputField";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setField } from "../../store/features/signup";
import { toast } from "react-toastify";
import { toastStyle } from "./data";
import axios from "axios";


const Signup = () => {
    const dispatch = useAppDispatch();
    const formData = useAppSelector((state) => state.signup);
    

    const handleSubmit  = async (event: React.FormEvent) => {
        event.preventDefault();

        if(formData.firstName === "" || formData.lastName === "" || formData.username === "" || formData.password === "" || formData.confirmPassword === ""){
            toast.error('A field is empty', {
                position:  "top-right",
                style: toastStyle
              })
        }
        else if(formData.password.length  < 8){
            toast.warn("Password should be at least 8 characters long.", {
                style: toastStyle
            })
        }
        else if(formData.password !== formData.confirmPassword){
            toast.error("Password does not match", toastStyle);
        }
        else{
            try {
                const response = await axios.post("")
            } catch (error) {
                console.log(error)
            }
        }

        console.log(formData);
    }

  return (
    <div className={styles.signup}>

        <form className={styles.signup_form}>
            <div className={styles.signup_form_logo}>
                <img src={logo} alt="Company Logo"/>
            </div>
            <h1 className="blug_header">Sign Up</h1>
            <p className={styles.signup_form_top_text}>Enter your details below to create login and get started</p>

            <div className={styles.signup_form_container_div}>
                <div className={styles.signup_form_container_div_individual_div}>
                    <InputField
                        label="First Name"
                        placeholder="enter..."
                        text="text"
                        onChange={(e) => dispatch(setField({
                            field:  'firstName',
                            value : e.target.value
                        }))}
                    />
                </div>
                <div className={styles.signup_form_container_div_individual_div}>
                    <InputField
                        label="last Name"
                        placeholder="enter..."
                        text="text"
                        onChange={(e) => dispatch(setField({
                            field:  'lastName',
                            value : e.target.value
                        }))}
                    />
                </div>
                <div className={styles.signup_form_container_div_individual_div_middle}>
                    <InputField 
                        label="Username"
                        placeholder="enter..."
                        text="text"
                        onChange={(e) => dispatch(setField({
                            field:  'username',
                            value : e.target.value
                        }))}
                    />
                </div>
                <div className={styles.signup_form_container_div_individual_div}>
                    <InputField 
                        label="Password"
                        placeholder="*****"
                        text="password"
                        onChange={(e) => dispatch(setField({
                            field:  'password',
                            value : e.target.value
                        }))}
                    />
                </div>
                <div className={styles.signup_form_container_div_individual_div}>
                    <InputField 
                        label="Confirm Password"
                        placeholder="*****"
                        text="password"
                        onChange={(e) => dispatch(setField({
                            field:  'confirmPassword',
                            value : e.target.value
                        }))}
                    />
                </div>
                <button className="click_btn">Cancel</button>
                <button className="coloured_btn"
                    onClick={handleSubmit}
                >Confirm</button>
            </div>
        </form>

    </div>
  )
}

export default Signup