import styles from "./login.module.scss";
import "../../styles/_generic.scss";
import logo from "../../assets/heart.svg";
import InputField from "../../components/Utility/inputField/InputField";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectLoginError, selectLoginFormData, selectLoginStatus } from "../../store/selector";
import { toast } from "react-toastify";
import { sendLoginFormData } from "../../store/features/login";
import { PropagateLoader } from "react-spinners";
import { setLoginField } from "../../store/features/login";
import { useEffect} from "react";


const Login = () => {

  const dispatch = useAppDispatch();
  const loginData = useAppSelector(selectLoginFormData);
  const loginError = useAppSelector(selectLoginError);
  const loginStatus = useAppSelector(selectLoginStatus);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (loginData.userName === "" || loginData.password === "") {
      toast.error("A field is empty", {
        className: "toastStyle",
      });
    } else if (loginData.password.length < 8) {
      toast.warn("Password should be at least 8 characters long.", {
        className: "toastStyle",
      });
    } else {
      try {
        await dispatch(sendLoginFormData(loginData))
      
      } catch (error) {
        // Handle other errors
      }
    }
  };

  useEffect(() => {
    // Now check loginError and loginData.message
    if (loginError) {
      toast.error("Something went wrong", {
        className: "toastStyle"
      });
    } 
    if (loginData.message === "Login successful") {
      toast.success("Login Successful", {
        className: "toastSuccess"
      });
      if(loginData.userId){
        localStorage.setItem('userId', loginData.userId)
      }
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [loginError, loginData.message, navigate])

  const goToSign = () => {
    navigate("/sign-up");
  }


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if(token){
  //         await getAuthenticationToken();
  //       }else{
  //         console.log('not yet logged in');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  
  //   fetchData();
  // }, [token]);
  

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
              onChange={(e) => {dispatch(setLoginField({
                field: 'userName',
                value: e.target.value
              }))}}
            />
          </div>
          <div className={styles.login_container_login_form_div}>
            <InputField
              id="password"
              label="password"
              labelId="pass"
              placeholder="enter password..."
              text="password"
              onChange={(e) => {dispatch(setLoginField({
                field: 'password',
                value: e.target.value
              }))}}
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
          Don't have an account? 
          <span
            onClick={goToSign}
            style={{
              color: "#0B60B0",
              cursor: "pointer",
            }}
          > SignUp
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
