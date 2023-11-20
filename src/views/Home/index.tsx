import { getUserInfo } from "@/request/mock";
import { useSelector, store } from "@/store";
import React, { useEffect, useState } from "react";

const Home = () => {
  const num = useSelector((state) => state.count.num);
  const [image, setImage] = useState("");
  useEffect(() => {
    getUserInfo().then((res) => {
      setImage(res.data.message);
    });
  }, []);
  function handleClick() {
    store.dispatch.count.incrementAsync(2);
  }
  return (
    <div>
      <p onClick={handleClick}>Home</p>
      <p>{num}</p>
      <img src={image} alt="" />
    </div>
  );
};
export default Home;
