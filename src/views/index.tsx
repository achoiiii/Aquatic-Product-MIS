import React, { useEffect, useState } from 'react';
import './index.scss';
import { Breadcrumb, Layout, theme } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import MenuComp from '@/components/Menu';
import TitleLogoBar from '@/components/TitleLogoBar';
import config from '@/config';
import { getPath } from '@/utils/url';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import DropdownBar from '@/components/DropdownBar';
import { useSelector } from '@/store';

const { Header, Content, Footer, Sider } = Layout;

const View: React.FC = () => {
  const { menuItems } = config;
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const location = useLocation();
  const { isLogin } = useSelector((state) => state.user);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (!isLogin) return;
    if (location.pathname === '/forbid') return setBreadcrumbItems([{ title: '权限限制' }]);
    generateBreadcrumb(menuItems, getPath());
  }, []);

  // 生成面包屑
  function generateBreadcrumb(menuItems: ItemType<MenuItemType>[], currentPath: string) {
    let breadcrumb: { title: string }[] | { title: any; href?: any }[] = [];
    console.log(currentPath, 'currentPathcurrentPathcurrentPath');

    function findMenuItem(items: ItemType<MenuItemType>[], path: string) {
      for (let item of items) {
        if (item?.key === path) {
          breadcrumb.push({
            title: item.label,
            href: item.key,
          });
          return true;
        }

        if (item?.children) {
          if (findMenuItem(item.children, path)) {
            breadcrumb.push({
              title: item.label,
            });
            return true;
          }
        }
      }
      return false;
    }

    findMenuItem(menuItems, currentPath);
    breadcrumb.reverse(); // 反转数组，使其按照层级顺序排列
    delete breadcrumb[breadcrumb.length - 1].href;
    setBreadcrumbItems(breadcrumb);
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <TitleLogoBar collapsed={collapsed} />
        <MenuComp onPathChange={generateBreadcrumb} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }} separator="/" items={breadcrumbItems} />
          <DropdownBar />
        </Header>
        <Content style={{ margin: '16px' }}>
          <div>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Create By Ant Design ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default View;
