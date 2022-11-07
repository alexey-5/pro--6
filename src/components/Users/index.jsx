import React from "react";
import { useState } from "react";
import { Success } from "../Success";
import { Skeleton } from "./Skeleton";
import { User } from "./User";

export const Users = ({ items, isLoading }) => {
  const [search, setSearch] = useState("");
  const [invite, setInvite] = useState([]);
  const [post, setPost] = useState(false);
  const onClickInvite = (id) => {
    if (invite.find((elem) => elem === id)) {
      setInvite(invite.filter((item) => item !== id));
    } else {
      setInvite( [...invite, id] );
    }
  };
  
if(!post) { return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          type="text"
          placeholder="Найти пользователя..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {items
            .filter((item) => {
              const info = (item.first_name + item.last_name).toLowerCase();
              if (info.includes(search.toLowerCase())) return true;
            })
            .map((elem) => (
              <User
                key={elem.id}
                {...elem}
                onClickInvite={onClickInvite}
                invite={invite}
              />
            ))}
        </ul>
      )}
      {!!invite.length && <button onClick={()=>setPost(true)} className="send-invite-btn">Отправить приглашение</button>}
    </>
  );}
  return(
    <Success count={invite.length}/>
  )
};
