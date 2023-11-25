"use client";
import type { NextPage } from "next";
import Link from "next/link"; //相当于是a标签
import { navs } from "./config";
import style from "./index.module.scss";
import { usePathname } from "next/navigation";
import { Button } from "antd";

const NavBar: NextPage = () => {
    const pathname = usePathname();
    return (
        <div className={style.navbar}>
            <section className={style.logoArea}>BLOG</section>
            <section className={style.linkArea}>
                {navs?.map((item) => (
                    <Link key={item?.value} href={item?.value}>
                        <span
                            className={
                                pathname === item?.value ? style.active : ""
                            }>
                            {item?.label}
                        </span>
                    </Link>
                ))}
            </section>
            <section className={style.operationArea}>
                <Button>写文章</Button>
                <Button>登录</Button>
            </section>
        </div>
    );
};

export default NavBar;
