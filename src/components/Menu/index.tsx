import { Menu } from 'antd';
import { getPath } from '@/utils/url';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '@/config';
import { IMenuCompProps } from '../typing';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useSelector } from '@/store';

const { menuItems } = config;
const path = getPath();
const MenuComp = function (props: IMenuCompProps) {
  menuItems.find((item) => item?.key === '/userManage')['disabled'] = useSelector((state) => state.user.type !== 0);
  menuItems.find((item) => item?.key === '/data')['disabled'] = useSelector((state) => state.user.type !== 0);
  const navigateTo = useNavigate();
  const location = useLocation();
  const { onPathChange } = props;

  const openkeys = generateOpenkeys();
  const selectKeys = generateSelectKeys();

  const [currentOpenkeys, setCurrentOpenkeys] = useState(openkeys);
  const [currentSelectKeys, setCurrentSelectKeys] = useState(selectKeys);

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
            const pathArr = path.split('/');
            openkeys.push('/' + pathArr[pathArr.length - 2]);
            return true;
          }
        }
      }
      return false;
    }
    findMenuItem(menuItems, path);
    return openkeys;
  }

  function generateSelectKeys() {
    const selectKeys: string[] = [];
    const pathArr = location.pathname
      .split('/')
      .filter(Boolean)
      .map((segment) => {
        return '/' + segment;
      });
    for (let i = 0; i < pathArr.length; i++) {
      let selectKey = '';
      for (let j = i; j < pathArr.length; j++) {
        selectKey += pathArr[j];
      }
      selectKeys.push(selectKey);
    }
    return selectKeys;
  }

  function handleOpenChange(keys: string[]) {
    setCurrentOpenkeys(keys);
  }

  function routerJump(e: { key: string }) {
    navigateTo(e.key);
    onPathChange(menuItems, e.key);
  }

  function handleSelect(keys): void {
    setCurrentSelectKeys(keys.keyPath);
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
      selectedKeys={currentSelectKeys}
      onSelect={handleSelect}
    />
  );
};
export default MenuComp;
