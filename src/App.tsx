import "./App.css";
import Widget from "./widget/Widget";
import { UserContext } from "./utils/UserContext";
import { useState } from "react";

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
  const csrftoken = getCookie('csrftoken')
  const user = {
    username:props.username, 
    name:props.name, 
    email: props.email, 
    role:props.role,
    csrftoken:csrftoken
  };
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
