import React, { Component, useEffect, useState } from "react";
// import "../MainContent/MainContent.css";
import Grid from '@mui/material/Grid';
import Statusbar from "../Statusbar/Statusbar";
import MainPage from "../MainPage/MainPage";

const MainContent =(props) => {


    return ( 
        <div>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={6}>
                    <div>
                    <Statusbar/>
                    <MainPage/>
                    </div>

                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={2}>

                    </Grid>
                </Grid>

            </div>
        );
    }

export default MainContent;