import React, { useEffect, useState } from "react";
import Collection from "./Collection";
import "./index.scss";

const cat = ["Все", "Море", "Горы", "Архитектура", "Города"];

function App() {
  const [collection, setCollection] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    fetch("https://63271534ba4a9c47533059e2.mockapi.io/favorite")
      .then((res) => res.json())
      .then((arr) => setCollection(arr))
      .catch((err) => console.log(err))
      .finally(()=>setIsLoading(false))
  }, []);
  //console.log(collection)
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cat.map((item, index) => (
            <li
              key={index}
              className={cat[index] === category ? "active" : ""}
              onClick={() => setCategory(cat[index])}
            >
              {item}
            </li>
          ))}
        
        </ul>
        <input
          value={search}
          className="search-input"
          placeholder="Поиск по названию"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="content">
        {isLoading? <h2>Идёт загрузка... </h2>:collection
          .filter((elem) =>
            elem.name.toLowerCase().includes(search.toLowerCase()) 
          )
          .filter((elem) =>
            cat[elem.category]===category || category==="Все"
          )
          .map((item, index) => (
            <Collection key={index} name={item.name} images={item.photos} />
          ))}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
