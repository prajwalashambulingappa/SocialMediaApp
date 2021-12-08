import React, { Component } from "react";
import "../LoginPage/LoginPage.css";
import Grid from "@mui/material/Grid";
import applogo from "../../images/logo.jpg";
import mail from "../../images/email.jpg";
import image from "../../images/IMG.jpg";
import SignUp from "../Signup/Signup";
import Signin from "../Signin/Signin";
import twitter from "../../images/twitter.jpg";
import linkedin from "../../images/linkedin.jpg";
import facebook from "../../images/facebook.jpg";
import insta from "../../images/insta.png";
import youtube from "../../images/youtube_.jpg";
import { fontSize } from "@mui/system";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
    };
  }

  changeLogin = () => {
    if (this.state.isLogin) this.setState({ isLogin: false });
    else this.setState({ isLogin: true });
  };

  render() {
    return (
      <div className="loginPage">
          <Grid container>
          <Grid item xs={3}>
            <div className="text"> Powered By: </div>
            <div>
              <a
                href="https://enquero.com/"
                target="_blank"
                className="imageLink"
              >
                {" "}
                <img className="enqurologo" src={applogo} alt="intro" />{" "}
              </a>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="wrap">
            <div className="LoginPage_main">
              {/* <div>
                <img src={image} width="300rem" alt="image"  />
              </div> */}
              <div>
                <div className="LoginPage_rightcomponent">
                  <div className="LoginPage_signin">
                    {this.state.isLogin ? <Signin /> : <SignUp />}
                  </div>
                </div>

                <div className="LoginPage_signupoption">
                  {this.state.isLogin ? (
                    <div
                      className="LoginPage_signup"
                      style={{ marginTop: "1rem" }}
                    >
                      Don't have an account?{" "}
                      <span
                        onClick={this.changeLogin}
                        style={{ fontWeight: "bold" }}
                      >
                        Sign Up!
                      </span>
                    </div>
                  ) : (
                    <div
                      className="LoginPage_signin"
                      style={{ paddingLeft: "19.5rem", fontSize:"1rem", marginTop:"-1rem"}}
                    >
                      Have an account?{" "}
                      <span
                        onClick={this.changeLogin}
                        style={{ fontWeight: "bold" }}
                      >
                        Sign In!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="findustext"> Find us: </div>
            <div className="finduslogo">
              <div>
                <a
                  href="https://www.youtube.com/channel/UCNaoLuY-e5Cyc5lkbq9C51Q"
                  target="_blank"
                  className="imageLink"
                >
                  {" "}
                  <img
                    className="youtubepage"
                    src={youtube}
                    alt="youtube"
                  />{" "}
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/company/enquero/"
                  target="_blank"
                  className="imageLink"
                >
                  {" "}
                  <img
                    className="linkedinpage"
                    src={linkedin}
                    alt="linkedin"
                  />{" "}
                </a>
              </div>
              <div>
                <a
                  href="https://www.facebook.com/enqueroinc/"
                  target="_blank"
                  className="imageLink"
                >
                  {" "}
                  <img className="facebookpage" src={facebook} alt="fb" />{" "}
                </a>
              </div>
              <div>
                <a
                  href="https://twitter.com/enqueroinc"
                  target="_blank"
                  className="imageLink"
                >
                  {" "}
                  <img
                    className="twitterpage"
                    src={twitter}
                    alt="twitter"
                  />{" "}
                </a>
              </div>
              <div>
                <a
                  href="https://instagram.com/enquero.inc?igshid=1audrjgu7pwjk"
                  target="_blank"
                  className="imageLink"
                >
                  {" "}
                  <img className="instapage" src={insta} alt="insta" />{" "}
                </a>
              </div>
            </div>
            
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
