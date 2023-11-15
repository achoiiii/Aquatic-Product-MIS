import React, { useState } from "react";
import "./index.scss";
import { Breadcrumb, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import MenuComp from "@/components/Menu";

const { Header, Content, Footer, Sider } = Layout;

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical">
          <div className="demo-logo" />
          <div className="demo-title">水产管理系统</div>
        </div>
        <MenuComp />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Breadcrumb
            style={{ margin: "16px 0" }}
            separator="/"
            items={[
              {
                title: "Home",
                href: "/home",
              },
              {
                title: "Application Center",
                href: "",
              },
              {
                title: "Application List",
                href: "",
              },
              {
                title: "An Application",
              },
            ]}
          />
          <div>User</div>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Create By Ant Design ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};

export default View;
