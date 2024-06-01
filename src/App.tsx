import React from 'react';
import Standard from './components/templates/standard/Standard';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <Standard />
      </main>
      <Footer />
    </>
  );
}

export default App;
