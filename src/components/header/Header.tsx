// src/components/Header.js

import React from 'react';

const Header = ({ title, subtitle }) => (
  <header className="resume-header" id="header">
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </header>
);

export default Header;
