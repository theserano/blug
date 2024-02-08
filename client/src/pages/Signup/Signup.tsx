import styles from "./signup.module.scss";
import "../../styles/_generic.scss";
import logo from "../../assets/heart.svg";
import InputField from "../../components/Utility/inputField/InputField";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  setField,
  sendSignUpFormData,
  reset,
} from "../../store/features/signup";
import { toast } from "react-toastify";
import { toastStyle } from "./data";
import {
  selectSignUpError,
  selectSignUpFormData,
  selectSignUpStatus,
} from "../../store/selector";
import { PropagateLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useAppDispatch();
  const signupData = useAppSelector(selectSignUpFormData);
  const formStatus = useAppSelector(selectSignUpStatus);
  const formError = useAppSelector(selectSignUpError);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      signupData.firstName === "" ||
      signupData.lastName === "" ||
      signupData.userName === "" ||
      signupData.password === "" ||
      signupData.confirmPassword === ""
    ) {
      toast.error("A field is empty", {
        position: "top-right",
        style: toastStyle,
      });
    } else if (signupData.password.length < 8) {
      toast.warn("Password should be at least 8 characters long.", {
        style: toastStyle,
      });
    } else if (signupData.password !== signupData.confirmPassword) {
      toast.error("Password does not match", toastStyle);
    } else {
      try {
        await dispatch(sendSignUpFormData(signupData));

        if (formError) {
          toast.error("Something went wrong", toastStyle);
        }

        if (signupData.message === "user has been registered") {
          toast.success("SignUp Successful", toastStyle);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        // console.log(error);
        // do nothing
      }
    }
  };

  const handleCancel = () => {
    // navigate('/')
    dispatch(reset());
  };
  const goToLogin = () => navigate("/login");

  return (
    <div className={styles.signup}>
      <form className={styles.signup_form}>
        <div className="logo">
          <img src={logo} alt="Company Logo" />
        </div>
        <h1 className="blug_header">Sign Up</h1>
        <p className="grey_text">
          Enter your details below to create login and get started
        </p>

        <div className={styles.signup_form_container_div}>
          <div className={styles.signup_form_container_div_individual_div}>
            <InputField
              id="firstName"
              label="First Name"
              labelId="fname"
              placeholder="enter..."
              text="text"
              onChange={(e) =>
                dispatch(
                  setField({
                    field: "firstName",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className={styles.signup_form_container_div_individual_div}>
            <InputField
              id="lastName"
              label="last Name"
              labelId="lname"
              placeholder="enter..."
              text="text"
              onChange={(e) =>
                dispatch(
                  setField({
                    field: "lastName",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div
            className={styles.signup_form_container_div_individual_div_middle}
          >
            <InputField
              id="userName"
              label="Username"
              labelId="uname"
              placeholder="enter..."
              text="text"
              onChange={(e) =>
                dispatch(
                  setField({
                    field: "userName",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className={styles.signup_form_container_div_individual_div}>
            <InputField
              id="password"
              label="Password"
              labelId="pass"
              placeholder="*****"
              text="password"
              onChange={(e) =>
                dispatch(
                  setField({
                    field: "password",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className={styles.signup_form_container_div_individual_div}>
            <InputField
              id="confirmPassword"
              label="Confirm Password"
              labelId="conPass"
              placeholder="*****"
              text="password"
              onChange={(e) =>
                dispatch(
                  setField({
                    field: "confirmPassword",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <button className="click_btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="coloured_btn" onClick={handleSubmit}>
            Confirm
          </button>
        </div>
        <p
          className="grey_text"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "15px 0px 0px",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={goToLogin}
            style={{
              color: "blueviolet",
              cursor: "pointer",
            }}
          >
            {" "}
            Login
          </span>
        </p>
        <div className={styles.signup_form_signup_loader}>
          {formStatus ? <PropagateLoader color="#FCAEAE" /> : ""}
        </div>
      </form>
    </div>
  );
};

export default Signup;
