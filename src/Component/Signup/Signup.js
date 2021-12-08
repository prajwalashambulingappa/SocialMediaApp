import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";
import { signUpLink } from "../../URL/Url";
import "../Signup/Signup.css";

const SignUp = (props) => {

    const [mailInput, setmailInput] = useState('');
    const [passwordInput, setpasswordInput] = useState('');
    const [cpasswordInput, setcpasswordInput] = useState('');
    const [nameInput, setnameInput] = useState('');
    const [idInput, setidInput] = useState('');
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg,setErrorMsg] = useState(null);
    const [error,setError] = useState(null);
    const history= useHistory();

    const mailInputHandler = (event) => {
        setmailInput(event.target.value);
    }

    const nameInputHandler = (event) => {
        setnameInput(event.target.value);
    }

    const idInputHandler = (event) => {
        setidInput(event.target.value);
    }

    const passwordInputHandler = (event) => {
        setpasswordInput(event.target.value);
    }

    const cpasswordInputHandler = (event) => {
        setcpasswordInput(event.target.value);
    }

    const signUpHandler=()=>{

        if(mailInput.length===0 || passwordInput.length===0 || nameInput.length===0 || idInput.length===0){
            setErrorMsg("All fields are mandatory!");
            return;
        }

        if(passwordInput !== cpasswordInput){
            setError("Passwords are not matching...Please check again.");
            return;
        }

        setError(null);

        setErrorMsg(null);
        
        fetch(signUpLink,{
            method: "POST",
            body:JSON.stringify({
                email: mailInput,
                // fullname: nameInput,
                username: idInput,
                password: passwordInput 
            }),
            headers:{
                'Content-Type':"application/json"
            }
        })
        .then(response => response.json())
        .then(data=>{
            console.log(data);
            if(data.status===202){
                history.push("/home");
            }
            if(data.status===406){
                setErrorMsg(data.message);
                setSuccessMsg(null);
            }
        })
        .catch(error=>{
            console.log(error.message);
            setErrorMsg(error.message);
            setSuccessMsg(null);
        });
    }

        return (
            <div className="container">
                <div>
                    <div>
                        {errorMsg && <p>{errorMsg}</p>}
                        {error && <p>{error}</p>}
                        {successMsg && <p>{successMsg}</p> }
                        <input className="LoginPage_id" onChange={mailInputHandler} type="email" placeholder="Email" required />
                        <input className="LoginPage_id" onChange={nameInputHandler}  type="text" placeholder="Full Name" required />
                        <input className="LoginPage_id" onChange={idInputHandler}  type="text" placeholder="UserID" required />
                        <input className="LoginPage_pass shadow-none" 
                            type="password" 
                            name="password"                           
                            onChange={passwordInputHandler} 
                            placeholder="Password" 
                            required/>
                        <input className="LoginPage_pass" 
                            type="password" 
                            name="confirmpassword" 
                            onChange={cpasswordInputHandler} 
                            placeholder="Confirm Password"  
                            required />
                        <button className="LoginPage_button" onClick={signUpHandler} >Sign Up!</button>
                    </div>
                </div>
            </div>
        );
    }


export default SignUp;