import React, { useEffect, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [list, setList] = useState({});

  useEffect(() => {
    fetch
      .get("https://cdn.cur.su/api/latest.json")
      .then(res => res.json())
      .then(res => setList(res))
      .catch(err => console.log(err))
  }, []);
  return (
    <div className="App">
      <Block
        value={0}
        currency="RUB"
        onChangeCurrency={(cur) => console.log(cur)}
      />
      <Block value={0} currency="USD" />
    </div>
  );
}

export default App;
