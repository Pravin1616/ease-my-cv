import React from "react";
import Standard from "./components/templates/standard/Standard";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="container mx-auto p-4 flex-grow">
        <Standard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
