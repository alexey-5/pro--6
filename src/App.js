import { useState } from "react";
import "./index.scss";

const questions = [
  {
    title: "React - это ... ?",
    variants: ["библиотека", "фреймворк", "приложение"],
    correct: 0,
  },
  {
    title: "Компонент - это ... ",
    variants: [
      "приложение",
      "часть приложения или страницы",
      "то, что я не знаю что такое",
    ],
    correct: 1,
  },
  {
    title: "Что такое JSX?",
    variants: [
      "Это простой HTML",
      "Это функция",
      "Это тот же HTML, но с возможностью выполнять JS-код",
    ],
    correct: 2,
  },
];
//===================================
function Result({resultat,setEnd,setResultat}) {

  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {resultat} ответа из {questions.length}</h2>
      <button onClick={()=>{setEnd(false); setResultat(0) }}>Попробовать снова</button>
    </div>
  );
}

function Game({ setEnd, setResultat, resultat }) {
  const [item, setItem] = useState(0); //блок опроса
  const test = questions[item];
  const bar = item/questions.length*100

  const next = (variant) => {
    if (variant === test.variants[test.correct]) setResultat(resultat + 1);
    if (item < 2) setItem(item + 1);
    else setEnd(true);
  };
  //console.log(resultat)
  return (
    <>
      <div className="progress">
        <div style={{ width: `${bar}%` }} className="progress__inner"></div>
      </div>
      <h1>{test.title}</h1>
      <ul>
        {test.variants.map((elem) => (
          <li key={elem} onClick={() => next(elem)}>
            {elem}
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [end, setEnd] = useState(false);
  const [resultat, setResultat] = useState(0);

  return (
    <div className="App">
      {end ? (
        <Result resultat={resultat} setEnd={setEnd} setResultat={setResultat}/>
      ) : (
        <Game setEnd={setEnd} setResultat={setResultat} resultat={resultat} />
      )}
    </div>
  );
}

export default App;
