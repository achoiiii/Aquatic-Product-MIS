import { Menu } from "antd";
import { getPath } from "@/lib/network/utils/qs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "@/config";
import { IMenuCompProps } from "../typing";

const MenuComp = function (props: IMenuCompProps) {
  const navigateTo = useNavigate();
  const { onPathChange } = props;
  const [openKeys, setOpenKeys] = useState([""]);
  const path = getPath();
  const { menuItems } = config;

  function handleOpenChange(keys: string[]) {
    setOpenKeys([keys[keys.length - 1]]);
  }

  function routerJump(e: { key: string }) {
    navigateTo(e.key);
    onPathChange(menuItems, e.key);
  }
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[path]}
      mode="inline"
      items={menuItems}
      onClick={routerJump}
      onOpenChange={handleOpenChange}
      openKeys={openKeys}
    />
  );
};
export default MenuComp;
