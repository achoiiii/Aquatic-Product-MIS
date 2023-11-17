import { useSelector, store } from "@/store";
import React, { useEffect } from "react";

const Home = () => {
  const num = useSelector((state) => state.count.num);
  function handleClick() {
    store.dispatch.count.incrementAsync(2);
  }
  return (
    <div>
      <p onClick={handleClick}>Home</p>
      <p>{num}</p>
    </div>
  );
};
export default Home;
