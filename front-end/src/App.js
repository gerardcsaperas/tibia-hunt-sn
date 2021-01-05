import React from "react";
import './App.css';


// Components
import MyNavBar from "./components/MyNavBar";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import MyRecords from "./components/MyRecords";







function App() {
  return (
    <div className="App">
      <MyNavBar/>
      {/* <HomePage/> */}
      {/* <SignUp/> */}
      {/* <LogIn/> */}
      <MyRecords/>
    </div>
  );
}

export default App;
