import type { MenuProps } from "antd";
import { Menu } from "antd";
import { getPath } from "@/lib/network/utils/qs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "@/config";

const MenuComp = function () {
  type MenuItem = Required<MenuProps>["items"][number];

  const navigateTo = useNavigate();
  const [openKeys, setOpenKeys] = useState([""]);
  const path = getPath();
  const { menuItems } = config;

  function handleOpenChange(keys: string[]) {
    setOpenKeys([keys[keys.length - 1]]);
  }

  function routerJump(e: { key: string }) {
    navigateTo(e.key);
  }
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
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
