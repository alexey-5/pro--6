import React, { useEffect, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [list, setList] = useState({});
  const [inputL, setInputL] = useState(0);
  const [inputR, setInputR] = useState(0);
  const [sumbL, setSumbL] = useState("USD");
  const [sumbR, setSumbR] = useState("RUB");
  //console.log(sumbL,list[sumbR])
  useEffect(() => {
    // EUR GBP RUB
    fetch("https://cdn.cur.su/api/latest.json")
      .then((res) => res.json())
      .then((res) => {
        setList(res.rates);
      })
      .catch((err) => console.log(err));
  }, []);

  const kf = (s1, s2) => {
    return (list[s2]/list[s1]);
  };
// ====  Пересчёт при вводе input
  const inLeft = (v) => {
    setInputL(v);
    setInputR(v * kf(sumbL, sumbR));
  };
  const inRight = (v) => {
    setInputR(v);
    setInputL(v * kf(sumbR, sumbL));
  };
// ====  Пересчёт при смене валюты
  const changeForexL = (cur)=>{
    setSumbL(cur)
    //console.log(sumbL)
    setInputL(inputR * kf(sumbR, cur))
  }
  const changeForexR = (cur)=>{
    setSumbR(cur)
    setInputR(inputL * kf(sumbL, cur))
  }

  return (
    <div className="App">
      <Block
        value={inputL}
        currency={sumbL}
        onChangeCurrency={(cur) => changeForexL(cur)}
        onChangeValue={(v) => inLeft(v)}
      />
      <Block
        value={inputR}
        currency={sumbR}
        onChangeCurrency={(cur) => changeForexR(cur)}
        onChangeValue={(v) => inRight(v)}
      />
    </div>
  );
}
export default App;
