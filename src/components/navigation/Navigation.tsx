import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Link from 'next/link';

import SettingsMenu from './SettingsMenu';

const Navigation = () => {
  return (
    <Menu
      // onClick={this.handleClick}
      selectedKeys={[]}
      mode="horizontal"
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </Menu.Item>
      <SubMenu key="submenu:posts" icon={<SettingOutlined />} title="Posts">
        <Menu.Item key="posts:all">
          <Link href="/posts/all">
            <a>All</a>
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="posts:recent">
          <Link href="/posts/all">
            <a>Recent</a>
          </Link>
        </Menu.Item> */}
        <Menu.Item key="posts:random">
          <Link href="/post/random">
            <a>Random</a>
          </Link>
        </Menu.Item>
      </SubMenu>

      <SettingsMenu />
    </Menu>
  );
};

export default Navigation;
