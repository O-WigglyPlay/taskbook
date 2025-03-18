import React, { useState } from "react";

const FriendSearch = ({ friends, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // 부모 컴포넌트(FriendList)로 검색어 전달
  };

  return (
    <div className="friend-search">
      <input
        type="text"
        placeholder="친구 검색..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default FriendSearch;
