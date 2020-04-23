import React from "react";

import { Router } from "@reach/router";
import { AuthProvider } from "./Components/Auth/AuthProvider";
import Navbar from "./Components/Navbar";
import MainPageContent from "./Components/Main/MainPageContent";
import Footer from "./Components/Footer";
import LogIn from "./Components/Auth/LogIn";
import SignUp from "./Components/Auth/SignUp";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import Collection from "./Components/Collection/Collection";
import Upload from "./Components/Upload";
import Album from "./Components/Paths/Album";
import SearchResultsAll from "./Components/Search/SearchResultsAll";

function App() {
  return (
    <AuthProvider>
      <div className="content">
        <Navbar />
        <Router>
          <MainPageContent path="/" />
          <LogIn path="/login" />
          <SignUp path="/signup" />
          <ForgotPassword path="/forgotPassword" />
          <Collection path="/collection/:user" />
          <Upload path="/upload" />
          <Album path="albums/:id" />
          <SearchResultsAll path="search/:q/*" />
        </Router>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
