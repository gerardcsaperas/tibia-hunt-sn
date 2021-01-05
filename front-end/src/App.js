import React from "react";
import './App.css';
import HomePage from "./components/HomePage";
import MyNavBar from "./components/MyNavBar";
import SignUp from "./components/SignUp";





function App() {
  return (
    <div className="App">
      <MyNavBar/>
      {/* <HomePage/> */}
      <SignUp/>
    </div>
  );
}

export default App;
