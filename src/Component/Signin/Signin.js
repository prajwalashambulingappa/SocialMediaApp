import React, { Component, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "../LoginPage/LoginPage.css";
import GoogleLogin from "react-google-login";
import { signInLink } from "../../URL/Url";
import AppAuthContext from "../../context/app-auth-context";

const Signin = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const history = useHistory();
  const appCtx = useContext(AppAuthContext);
  if(appCtx.isLoggedIn){
    history.push("/home");
  }
  const responsGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  const EmailInputHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const passwordInputHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  const loginHandler = () => {
    if (emailInput.length === 0 || passwordInput.length === 0) {
      setErrorMsg("All fields are mandatory!");
      return;
    }

    setErrorMsg(null);

    fetch(signInLink, {
      method: "POST",
      body: JSON.stringify({
        userEmail: emailInput,
        password: passwordInput,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 202) {
          //   setSuccessMsg(data.message);
          //   setErrorMsg(null);
          appCtx.login(emailInput);
          history.push("/home");
        }
        if (data.status === 406) {
          setErrorMsg(data.message);
          setSuccessMsg(null);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMsg(error.message);
        setSuccessMsg(null);
      });
  };

  return (
    <div>
      {errorMsg && <p>{errorMsg}</p>}
      {successMsg && <p>{successMsg}</p>}
      <input
        className="LoginPage_id"
        onChange={EmailInputHandler}
        type="email"
        placeholder="Email"
        value={emailInput}
      />
      <input
        className="LoginPage_pass"
        onChange={passwordInputHandler}
        type="password"
        placeholder="Password"
        value={passwordInput}
      />
      <button className="LoginPage_button" onClick={loginHandler}>
        Sign In
      </button>

      <div className="LoginPage_entity">
        <div className="LoginPage_divider"></div>
        <div className="LoginPage_or">OR</div>
        <div className="LoginPage_divider"></div>
      </div>

      <div className="LoginPage_email">
        <GoogleLogin
          style={{ marginRight: "0.5rem" }}
          clientId="1029967772822-dslqregjtcbi0vq0njl537c8n6rvc0jk.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responsGoogle}
          onFailure={responsGoogle}
          cookiePolicy={"single_host_origin"}
        />
        {/* <img src={mail} width="18rem" style={{"marginRight":"0.5rem"}} alt="maillogo"/> 
                                            Login with Google */}
      </div>
      <div className="LoginPage_forgotpass">Forgot Password? </div>
    </div>
  );
};

export default Signin;
