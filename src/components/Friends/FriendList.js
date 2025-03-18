import React, { useState } from "react";
import FriendItem from "./FriendItem";
import FriendSearch from "./FriendSearch";

const FriendList = ({ friends }) => {
  const [filteredFriends, setFilteredFriends] = useState(friends);

  const handleSearch = (query) => {
    const filtered = friends.filter((friend) =>
      friend.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFriends(filtered);
  };

  return (
    <div className="friend-list">
      <FriendSearch friends={friends} onSearch={handleSearch} />
      {filteredFriends.map((friend) => (
        <FriendItem key={friend.id} friend={friend} />
      ))}
    </div>
  );
};

export default FriendList;
