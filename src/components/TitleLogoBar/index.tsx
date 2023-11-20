import React from "react";
import { ITitleLogoBarProps } from "../typing";
import "./index.scss";

function TitleLogoBar(props: ITitleLogoBarProps) {
  return (
    <div className="demo-logo-vertical">
      <div className="demo-logo" />
      {!props.collapsed ? (
        <div className="demo-title" style={{ opacity: 1 }}>
          水产管理系统
        </div>
      ) : (
        <div className="demo-title" style={{ opacity: 0 }} />
      )}
    </div>
  );
}
export default TitleLogoBar;
