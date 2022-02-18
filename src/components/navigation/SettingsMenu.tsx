import { SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const authPages = ['/account'];

const SettingsMenu = () => {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  const menu = session ? (
    <SubMenu key="submenu:settings" icon={<SettingOutlined />} title="Settings">
      <Menu.Item key="settings:account">
        <Link href="/account">
          <a>
            {
              // session?.user?.username ||
              session?.user?.name?.split(' ')[0] ||
                session?.user?.email ||
                'Account'
            }
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="settings:signout">
        <Link href="/api/auth/signout">
          <a
            onClick={async (event) => {
              event.preventDefault();
              await signOut({
                redirect: authPages.includes(pathname),
                callbackUrl: '/',
              });

              // If on a protected page, redirect
              // if (authPages.includes(pathname)) {
              //   push(data.url);
              // }
            }}
          >
            Sign out
          </a>
        </Link>
      </Menu.Item>
    </SubMenu>
  ) : (
    <Menu.Item
      key="settings:signin"
      icon={<SettingOutlined />}
      onClick={() => signIn()}
    >
      Sign in
    </Menu.Item>
  );
  return menu;
};

export default SettingsMenu;
