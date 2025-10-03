import Footer from '../common/Footer';
import Header from '../common/Header';
import { Outlet } from 'react-router-dom';
import { AppProvider } from '@/components/common/AppProvider';

const Layout = () => {
  return (
    <AppProvider>
      <div className="font-Poppins rtl:font-arabic">
        <Header />

        <main className="m-auto flex flex-col bg-gray-50 pb-[80px]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
};
export default Layout;
