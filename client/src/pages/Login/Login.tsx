import styles from "./login.module.scss";
import "../../styles/_generic.scss";
import logo from "../../assets/heart.svg";
import InputField from "../../components/Utility/inputField/InputField";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectLoginError, selectLoginFormData, selectLoginStatus } from "../../store/selector";
import { toastStyle } from "../Signup/data";
import { toast } from "react-toastify";
import { sendLoginFormData } from "../../store/features/login";
import { PropagateLoader } from "react-spinners";


const Login = () => {

  const dispatch = useAppDispatch();
  const loginData = useAppSelector(selectLoginFormData);
  const loginError = useAppSelector(selectLoginError);
  const loginStatus = useAppSelector(selectLoginStatus);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event: React.FormEvent) => {

    event.preventDefault();
    
    if (loginData.userName === "" || loginData.password === ""){
      toast.error("A field is empty", {
        position: "top-right",
        style: toastStyle,
      });
    } else if(loginData.password.length < 8){
      toast.warn("Password should be at least 8 characters long.", {
        style: toastStyle,
      });
    } else{
      try {
        await dispatch(sendLoginFormData(loginData));

        if (loginError) {
          toast.error("Something went wrong", toastStyle);
        }

        if (loginData.message === "user has been registered") {
          toast.success("Login Successful", toastStyle);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        // console.log(error)
        // do nothing
      }
    }

  };

  const goToSign = () => {
    navigate("/sign-up");
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_container_login}>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <h1 className="blug_header">Welcome back</h1>
        <p className="grey_text" 
          style={{
            textAlign: "center"
          }}
        >
          Glad to see you again 👋 <br /> Login to your account bellow
        </p>

        <form className={styles.login_container_login_form}>
          <div className={styles.login_container_login_form_div}>
            <InputField
              id="userName"
              label="User Name"
              labelId="uname"
              placeholder="enter username..."
              text="text"
              onChange={() => {}}
            />
          </div>
          <div className={styles.login_container_login_form_div}>
            <InputField
              id="password"
              label="password"
              labelId="pass"
              placeholder="enter password..."
              text="password"
              onChange={() => {}}
            />
          </div>

          <button className="coloured_btn" 
          style={{
            width: "100%",
            padding: "1rem 0"
          }}
          onClick={handleLoginSubmit}>
            Confirm
          </button>
          <p
          className="grey_text"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "15px 0px 0px",
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={goToSign}
            style={{
              color: "#0B60B0",
              cursor: "pointer",
            }}
          >
            {" "}
            SignUp
          </span>
        </p>
        <div className={styles.login_form_login_loader}>
          {loginStatus ? <PropagateLoader color="#FCAEAE" /> : ""}
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
