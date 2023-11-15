import React from "react";
import router from "./router";
import { Link, useRoutes } from "react-router-dom";

function App() {
  const routes = useRoutes(router);
  return (
    <div className="app">
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      {routes}
    </div>
  );
}

export default App;
