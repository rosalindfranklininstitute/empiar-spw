import "./App.css";
import Widget from "./widget/Widget";
import { UserContext } from "./utils/UserContext";
import { useState } from "react";
import configData from "../src/static/config.json"

interface AppProps {
  username?: any,
  name?: any,
  email?: any,
  role?: any,
  csrftoken?: any
}

function getCookie(name:string) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : '';
}

function App(props:AppProps) {
  let currentUser: any = {}
  if (configData.ENV == "DEV"){
  const csrftoken = getCookie('csrftoken');
  currentUser = {
    username:props.username, 
    name:props.name, 
    email: props.email, 
    role:props.role,
    csrftoken:csrftoken
  };
}
else{
  if(configData.LOCCURRENTUSER.TYPE == "depositor"){
    currentUser = {
      username:configData.LOCUSER.DEP.USER_NAME, 
      name:configData.LOCUSER.DEP.NAME,
      email: configData.LOCUSER.DEP.USER_EMAIL,
      role:configData.LOCUSER.DEP.USER_ROLE,
      csrftoken:''
    }
  }
  else{
    currentUser= {
      username:configData.LOCUSER.ANNOT.USER_NAME, 
      name:configData.LOCUSER.ANNOT.NAME,
      email: configData.LOCUSER.ANNOT.USER_EMAIL,
      role:configData.LOCUSER.ANNOT.USER_ROLE,
      csrftoken:''
    }
  }
}
const user = currentUser;
  return (
    <>
      <UserContext.Provider value={user}>
        <div className="App">
          <Widget ></Widget>
        </div>
      </UserContext.Provider> 
    </>
  );
}

export default App;
