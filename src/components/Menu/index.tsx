import { Menu } from "antd";
import { getPath } from "@/utils/url";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "@/config";
import { IMenuCompProps } from "../typing";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";

const { menuItems } = config;
const path = getPath();
const MenuComp = function (props: IMenuCompProps) {
  const navigateTo = useNavigate();
  const { onPathChange } = props;

  const openkeys = generateOpenkeys();

  const [currentOpenkeys, setCurrentOpenkeys] = useState(openkeys);

  function generateOpenkeys() {
    let openkeys: any[] = [];
    function findMenuItem(items: ItemType<MenuItemType>[], path: string) {
      for (let item of items) {
        if (item?.key === path) {
          openkeys.push(path);
          return true;
        }

        if (item?.children) {
          if (findMenuItem(item.children, path)) {
            const pathArr = path.split("/");
            openkeys.push("/" + pathArr[pathArr.length - 2]);
            return true;
          }
        }
      }
      return false;
    }
    findMenuItem(menuItems, path);
    return openkeys;
  }

  function handleOpenChange(keys: string[]) {
    setCurrentOpenkeys(keys);
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
      openKeys={currentOpenkeys}
    />
  );
};
export default MenuComp;
