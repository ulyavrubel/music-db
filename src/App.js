import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import { AuthProvider } from "./Components/Auth/AuthProvider";
import Navbar from "./Components/Navbar";
import MainPageContent from "./Components/MainPageContent";
import Footer from "./Components/Footer";
import LogIn from "./Components/Auth/LogIn";
import SignUp from "./Components/Auth/SignUp";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import Collection from "./Components/Collection";
import Upload from "./Components/Upload";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Router>
        <MainPageContent path="/" />
        <LogIn path="/login" />
        <SignUp path="/signup" />
        <ForgotPassword path="/forgotPassword" />
        <Collection path="/collection/:user" />
        <Upload path="/upload" />
      </Router>
      <Footer />
    </AuthProvider>
  );
}

export default App;
