'use client';
import type { NextPage } from 'next';
import Link from 'next/link'; //相当于是a标签
import { navs } from './config';
import Login from '../Login/index';
import style from './index.module.scss';
import { usePathname } from 'next/navigation';
import { Button, Dropdown, Avatar } from 'antd';
import { LoginOutlined, HomeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useStore } from '../../store/index';
import { UserOutlined } from '@ant-design/icons';
import request from '@/service/fetch';
import { observer } from 'mobx-react-lite';

const NavBar: NextPage = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const pathname = usePathname();
  const store = useStore();
  const { userId, avatar } = store.user.userInfo;

  /**
   * 写文章
   */
  const handleGotoEditorPage = () => {};

  /**
   * 登录
   */
  const handleLogin = () => {
    setIsShowLogin(true);
  };

  /**
   * 关闭登录弹窗
   */
  const handleClose = () => {
    setIsShowLogin(false);
  };

  /**
   * 个人主页
   */
  const handleGotoPersonalPage = () => {};

  /**
   * 退出登录
   */
  const handleLogout = () => {
    request.post('/api/user/logout').then((res: any) => {
      if (res?.code === 0) {
        store.user.setUserInfo({});
      }
    });
  };

  const items = [
    {
      key: '1',
      label: (
        <p onClick={handleGotoPersonalPage}>
          <HomeOutlined />
          &nbsp;个人主页
        </p>
      ),
    },
    {
      key: '2',
      label: (
        <p onClick={handleLogout}>
          <LoginOutlined /> &nbsp;退出登录
        </p>
      ),
    },
  ];
  return (
    <div className={style.navbar}>
      <section className={style.logoArea}>BLOG</section>
      <section className={style.linkArea}>
        {navs?.map((item) => (
          <Link key={item?.value} href={item?.value}>
            <span className={pathname === item?.value ? style.active : ''}>
              {item?.label}
            </span>
          </Link>
        ))}
      </section>
      <section className={style.operationArea}>
        <Button onClick={handleGotoEditorPage}>写文章</Button>
        {userId ? (
          <>
            <Dropdown menu={{ items }} placement="bottomLeft">
              <Avatar size={32} icon={<UserOutlined />} />
            </Dropdown>
          </>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        )}
      </section>
      {/* 登录组件 */}
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  );
};

export default observer(NavBar);
