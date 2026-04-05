import React, { useState } from "react";

const App = () => {
  const [binaryNum, setBinaryNum] = useState("");
  const [res, setRes] = useState("");
  const [err, setErr] = useState("");
  const handleOnClick = (binaryNum) => {
    if (binaryNum === "") {
      setErr("Please Type a Binary number to convert first.");
      return;
    }
    let arr = binaryNum.trim("").split("");
    let len = binaryNum.length;
    let result = arr.reduce(
      (acc, val, idx) => acc + Number(val) * Math.pow(2, len - idx - 1),
      0,
    );
    setRes(result);
  };
  const handleOnChange = (e) => {
    let inputField = e.target;
    inputField.addEventListener("beforeinput", (e) => {
      const regex = /^[01]+$/;
      if (e.data && !regex.test(e.data)) {
        setErr("Only 0 and 1 allowed");
        e.preventDefault();
      }
    });
    setBinaryNum(e.target.value);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-2">
      <h1 className="font-bold text-3xl">Binary To Decimal Converter</h1>
      <div className="flex flex-col items-center justify-center gap-2.5 border rounded-2xl p-5 h-1/2 w-1/2 border-gray-400">
        <div
          className={`text-red-500 text-sm h-5 ${err ? "visible" : "invisible"}`}
        >
          {err}
        </div>
        <div className="flex flex-col gap-2.5 items-center justify-center">
          <input
            value={binaryNum}
            onChange={handleOnChange}
            id="binary"
            className="border border-amber-950 rounded p-3 text-xl"
            type="text"
          />
        </div>
        <div className="btn">
          <button
            onClick={() => handleOnClick(binaryNum)}
            className="bg-gray-400 text-black p-3 cursor-pointer"
          >
            Convert
          </button>
        </div>
        <div className="res">
          <span className={`block text-lg h-5 ${res ? "visible" : "invisible"}`}>
            {res}
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
