import React from "react";
import "./App.css";
import { Router, Link } from "@reach/router";
import Navbar from "./Components/Navbar";
import MainPageContent from "./Components/MainPageContent";
import Footer from "./Components/Footer";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <MainPageContent path="/" />
        <LogIn path="/login" />
        <SignUp path="/signup" />
      </Router>

      <Footer />
    </div>
  );
}

export default App;
