import { BrowserRouter, Routes, Route } from 'react-router-dom-dom';
import Layout from './components/Layouts/Layout';
import Home from './components/Layouts/Home';
import About from './components/Layouts/About';
import SignIn from './components/Layouts/SignIn';
import SignUp from './components/Layouts/SignUp';
import ErrorPage from './components/common/ErrorPage';
import Contact from './components/Layouts/Contact';
import Details from './components/Layouts/Details';
import AllProducts from './components/Layouts/AllProducts';
import ScrollToTop from './utils/ScrollToTop';
import Wishlist from './components/Layouts/Wishlist';
import PageLoader from './components/common/PageLoader';
import Cart from './components/Layouts/Cart';
import CheckOut from './components/Layouts/CheckOut';
import { Orders } from './components/Layouts/Orders';
import { CanccellationsOrder } from './components/Layouts/CanccellationsOrder';
import { CategoryProducts } from './components/Layouts/CategoryProducts';
import { Account } from './components/Layouts/Account';
import { ToastContainer } from 'react-toastify';
import { CheckEmail } from './components/Layouts/CheckEmail';
import { Toaster } from 'react-hot-toast';
import { Reviews } from './components/Layouts/Reviews';
import { ForgetPassword } from './components/Layouts/ForgotPassword';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer position="top-center" />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
        }}
      />
      <PageLoader />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Reviews" element={<Reviews />} />
          <Route path="about" element={<About />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="/AllProducts/:category" element={<CategoryProducts />} />
          <Route path="AllProducts" element={<AllProducts />} />
          <Route path="contact" element={<Contact />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<Cart />} />
          <Route path="cart/CheckOut" element={<CheckOut />} />
          <Route path="orders" element={<Orders />} />
          <Route path="Account" element={<Account />} />
          <Route path="/Account/CheckEmail" element={<CheckEmail />} />
          <Route
            path="Canccellations-Order"
            element={<CanccellationsOrder />}
          />
          <Route path="/sign-in">
            <Route index element={<SignIn />} />

            <Route path="Forget-Password" element={<ForgetPassword />}></Route>
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
