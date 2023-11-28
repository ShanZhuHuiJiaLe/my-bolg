'use client';
import type { NextPage } from 'next';
import Link from 'next/link'; //相当于是a标签
import { navs } from './config';
import Login from '../Login/index';
import style from './index.module.scss';
import { usePathname } from 'next/navigation';
import { Button } from 'antd';
import { useState } from 'react';

const NavBar: NextPage = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const pathname = usePathname();

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
        <Button onClick={handleLogin} type="primary">
          登录
        </Button>
      </section>
      {/* 登录组件 */}
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  );
};

export default NavBar;
