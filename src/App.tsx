import "./App.css";
import Widget from "./widget/Widget";
import { UserContext } from "./utils/UserContext";
import { useState } from "react";

interface AppProps {
  username?: any,
  name?: any,
  email?: any,
  role?: any
}

function App(props:AppProps) {
  const user = {
    username:props.username, 
    name:props.name, 
    email: props.email, 
    role:props.role
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
