import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import MainPageContent from "./Components/MainPageContent";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <MainPageContent />
      <Footer />
    </div>
  );
}

export default App;
