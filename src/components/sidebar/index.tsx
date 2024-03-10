import styled from 'styled-components';
import { Layout, Menu } from 'antd';
// import { useRouter } from 'next/router';
import { MenuItem, findParentKeys, getsAllRoutes } from './utils';
import React from 'react';
import { useLocation } from 'react-router-dom';

const StyledSideBar = styled(Layout.Sider)`
  height: calc(100vh - 58px);
  border-right: 1px solid var(--stroke);
  position: sticky !important;
  top: 58px;
  bottom: 0;
  z-index: 1000;
  background: white !important;
  .user-info {
    text-align: center;
    padding: 16px 8px;
    background-color: var(--grey);
    font-size: 1.5rem;
    font-weight: 500;
    color: #007bec;
    border-radius: 6px;
    margin-bottom: 16px;

    &__avatar {
      border-radius: 40px;
      overflow: hidden;
    }

    &__right {
      color: #8c8c8c;
    }

    &__name {
      color: var(--text-bold);
      margin-bottom: 6px;
    }
  }

  .nav {
    &__pages-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  }

  .logout-btn {
    cursor: pointer;
    list-style: none;
    width: 100%;
    color: var(--red);
    display: flex;
    gap: 8px;
    padding: 8px 12px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export interface I_SidebarProps {
  routers?: MenuItem[];
}

export function Sidebar({ routers = [] }: I_SidebarProps) {
  const location = useLocation();
  return (
    <StyledSideBar
      breakpoint="md"
      collapsedWidth={0}
      width={270}
      trigger={null}
    >
      <div style={{ overflowY: 'auto', height: '100%', padding: '16px' }}>
        <Menu
          style={{ userSelect: 'none' }}
          items={routers}
          mode="inline"
          selectedKeys={[
            getsAllRoutes(routers)
              .filter((route) => location.pathname.includes(route))
              .sort((a, b) => b.length - a.length)[0],
          ]}
          defaultOpenKeys={findParentKeys(routers, location.pathname)}
        />
      </div>
    </StyledSideBar>
  );
}
