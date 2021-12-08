import React, { Component, useContext } from "react";
import "../NavBar/NavBar.css";
import Grid from '@mui/material/Grid';
import applogo from "../../images/logo.jpg";
import home from "../../images/homebutton.jpg";
import explore from "../../images/explorebutton.jpg";
import message from "../../images/messagebutton.jpg";
import profilepic from "../../images/profilepic.png";
import Avatar from '@mui/material/Avatar';
import logout from '../../images/logout.png';
import { useHistory } from "react-router-dom";
import AppAuthContext from "../../context/app-auth-context";

const NavBar = (prop) => {

    const history= useHistory();
    const appCtx = useContext(AppAuthContext);
    const logoutHandler = (event) => {
        appCtx.logout();
        history.push("/");
    }
    
    return ( 
            <div>
                <div className= "navbar_barcontent">
                    <Grid container>
                        <Grid item xs = {2}></Grid>
                        <Grid item xs = {3}>
                            <img className="navbar_logo" src = {applogo} alt="logo" width="125rem" />
                        </Grid>
                        <Grid item xs = {3}>
                            {/* <input className="navbar_search" text="text" placeholder="Search"/> */}
                        </Grid>
                        <Grid item xs = {3} style={{"display": "flex"}}>
                            {/* <img className="navbar_img" src= {home} alt="Home" width="20rem"/>
                            <img className="navbar_img" src= {explore} alt="Explore" width="20rem"/>
                            <img className="navbar_img" src= {message} alt="Messages" width="22rem"/> */}
                            <Avatar src={profilepic} className="navbar_img" style={{"maxWidth":"18rem", "maxHeight":"14rem"}} alt="Profilepic" />

                            {/* <button className="logoutbutton" onClick={logoutHandler}> */}
                               <img src={logout} className="logoutbutton" width="38rem" height="45rem" alt="button" onClick={logoutHandler} />

                            {/* </button> */}
                        </Grid>                   
                        <Grid item xs= { 1 }></Grid>
                    </Grid>
                </div>
            </div>
        );
    }


export default NavBar;