// import './App.css';
import Home from './Component/HomePage/Home';
import LoginPage from './Component/LoginPage/LoginPage';
import { useState , useContext} from 'react';
import {Switch,Route,useHistory} from 'react-router-dom';
import GoogleLogin from "react-google-login";
import Upload from './Component/Post/Upload';
import AppAuthContext  from './context/app-auth-context';
import { useNavigate } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image"
import AllComments from './Component/Comments/AllComments';
function App() {

  const history = useHistory();
  const appContext = useContext(AppAuthContext);
  if(!appContext.isLoggedIn){
     history.push("/");
  }

  if(appContext.isLoggedIn){
    history.push("/home");
  }

  return (
    <div className="App">      
        <Switch>
        <Route path="/home" exact> <Home /> </Route>
        
        <Route path="/" exact > <LoginPage /> </Route>

        <Route path="/all-comments" exact > <AllComments /> </Route>


        <Route path="/upload" > <Upload /> </Route>
        
      </Switch>
      
    </div>
  );
}

export default App;
