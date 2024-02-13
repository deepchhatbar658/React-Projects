import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import CursorAnimation from "./CursorAnimation";

function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [arrayValues, setArrayValues] = useState<Array<string | number>>(['', '', '', '']);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyPress = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Update the arrayValues based on the input value
    const newArray = Array.from({ length: 4 }, (_, index) =>
      index < value.length ? parseInt(value[index], 10) : ''
    );

    setArrayValues(newArray);

    // Update the activeIndex based on the input length
    setActiveIndex(value.length >= 4 ? 3 : value.length - 1);
  };

  return (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        {arrayValues.map((value, index) => (
          <div
            key={index}
            style={index==activeIndex?{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: "59px",
              width: "59px",
              borderRadius: "1em",
              color:' #a35fff',

              border: "1px solid #a35fff",
            }:{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: "59px",
              width: "59px",
              borderRadius: "1em",
              color:' #a35fff',
              border: "1px solid #a35fff55",
            }}
          >
            {value}
            {index === activeIndex && <CursorAnimation />}
          </div>
        ))}
      </div>
      <input
        type="text"
        id="textInput"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
      />
    </>
  );
}

export default App;
