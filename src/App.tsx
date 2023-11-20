import React from "react";
import router from "./router";
import { useRoutes } from "react-router-dom";

function App() {
  const routes = useRoutes(router);
  return <div className="app">{routes}</div>;
}

export default App;
