import React from "react";
import "./ColorSelector.css";
import { useTheme } from "../../ThemeContext";
import { themes } from "../../utils/Themes";

const ColorSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="color-selector-container">
      <p className="light-color">Select a color for selected resume.</p>
      <div className="color-selector-main">
        <div id="mainForm">
          <ul className="color-selector">
            {Object.keys(themes).map((colorKey, index) => (
              <li
                key={index}
                className="color-tile"
                onClick={() => setTheme(colorKey as keyof typeof themes)}
              >
                <span
                  className="color-selector-radio"
                  style={{ backgroundColor: themes[colorKey]["primary"] }}
                ></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className="selected-color-button"
        style={{ backgroundColor: theme.primary }}
      >
        Selected Color: {theme.primary}
      </button>
    </div>
  );
};

export default ColorSelector;
