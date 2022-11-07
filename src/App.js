import React, { useEffect, useState } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users/index";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err)=>{console.log(err);
      alert('ошибка при получении пользователей');
      }).finally(()=>setIsLoading(false))
  },[]);

  return (
    <div className="App">
      <Users items={users} isLoading={isLoading} />
      {/* <Success /> */}
    </div>
  );
}

export default App;
