import React, { useEffect, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [list, setList] = useState({});
  const [inputL, setInputL] = useState(0);
  const [inputR, setInputR] = useState(0);
  const [sumbL, setSumbL] = useState("USD");
  const [sumbR, setSumbR] = useState("RUB");
  //console.log(inputL,inputR)
 /*  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err)=>{console.log(err);
      alert('ошибка при получении пользователей');
      }).finally(()=>setIsLoading(false))
  },[]); */

  useEffect(() => {// EUR GBP RUB
    fetch("https://cdn.cur.su/api/latest.json")
      .then(res => res.json())
      .then(res => {setList(res.rates)
      })
      .catch(err => console.log(err))
  },[]);

  const inLeft = (v)=>{
    setInputL(v)
    setInputR(v*2)
  }

  const inRight = (v)=>{
    setInputR(v)
    setInputL(v*2)
  }

  return (
    <div className="App">
      <Block
        value={inputL}
        currency={sumbL}
        onChangeCurrency={(cur) => setSumbL(cur)}
        onChangeValue={(v)=>inLeft(v)}
      />
      <Block value={inputR}
       currency={sumbR} 
       onChangeCurrency={(cur) => setSumbR(cur)}
        onChangeValue={(v)=>inRight(v)}
       />
    </div>
  );
}

export default App;
