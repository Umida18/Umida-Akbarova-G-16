import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { Button, Layout as LayoutAntd, Menu, theme } from "antd";
const { Header, Sider, Content } = LayoutAntd;
import styled from "@emotion/styled";

const Layoutt = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState([""]);
  const [openKeys, setOpenKeys] = useState([""]);
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    setSelectedKey([location.pathname.slice(1)]);
  }, []);

  return (
    <LayoutAntd>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-[rgb(74, 74, 74)]"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={selectedKey}
          onSelect={({ selectedKeys }) => {
            setSelectedKey(selectedKeys);
          }}
          openKeys={openKeys}
          onOpenChange={(keys) => {
            setOpenKeys(keys);
          }}
          className="h-full pt-5"
          items={[
            {
              key: "movieTable",
              icon: <UserOutlined />,
              label: <Link to="/companyTable">Company</Link>,
            },
            {
              key: "genreTable",
              icon: <VideoCameraOutlined />,
              label: <Link to="/job">Job</Link>,
            },
          ]}
        />
      </Sider>
      <LayoutAntd>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            height: "679px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </LayoutAntd>
    </LayoutAntd>
  );
};
// const StyledLayout = styled(AntdLayout)<{
//   collapsed: boolean;
//   colorBgContainer: string;
//   borderRadiusMD: number;

// }>``;

export default Layoutt;
