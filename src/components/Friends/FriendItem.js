import React from "react";

const FriendItem = ({ friend }) => {
  return (
    <div className="friend-item">
      <img src={friend.avatar} alt={`${friend.name}의 프로필`} />
      <h3>{friend.name}</h3>
      <p>{friend.status}</p>
      <button>메시지 보내기</button>
    </div>
  );
};

export default FriendItem;
