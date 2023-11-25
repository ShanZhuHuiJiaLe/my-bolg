import type { NextPage } from 'next';
import { ReactNode } from 'react';
import Footer from '@/components/footer';
import NavBar from '@/components/navBar';

interface LayoutProps {
  children: ReactNode;
}
const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
