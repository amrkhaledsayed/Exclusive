import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense } from 'react';
import { LifeLine } from 'react-loading-indicators';
const Layout = lazy(() => import('./components/pages/Layout'));
const Home = lazy(() => import('./components/pages/Home'));
const ErrorPage = lazy(() => import('./components/common/ErrorPage'));
const Contact = lazy(() => import('./components/pages/Contact'));
const Details = lazy(() => import('./components/pages/Details'));
const AllProducts = lazy(() => import('./components/pages/AllProducts'));
const Wishlist = lazy(() => import('./components/pages/Wishlist'));
const Cart = lazy(() => import('./components/pages/Cart'));
const CheckOut = lazy(() => import('./components/pages/CheckOut'));
const Orders = lazy(() => import('./components/pages/Orders'));
const CanccellationsOrder = lazy(() =>
  import('./components/pages/CanccellationsOrder')
);
const CategoryProducts = lazy(() =>
  import('./components/pages/CategoryProducts')
);
const Account = lazy(() => import('./components/pages/Account'));
const CheckEmail = lazy(() => import('./components/pages/CheckEmail'));
const Reviews = lazy(() => import('./components/pages/Reviews'));
const ForgetPassword = lazy(() => import('./components/pages/ForgotPassword'));
const About = lazy(() => import('./components/pages/About'));
const SignIn = lazy(() => import('./components/pages/SignIn'));
const SignUp = lazy(() => import('./components/pages/SignUp'));
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
      <Suspense
        fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000033] backdrop-blur-sm">
            <LifeLine color="#cd3232" size="medium" text="" textColor="" />{' '}
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Reviews" element={<Reviews />} />
            <Route path="about" element={<About />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="/product/:id" element={<Details />} />
            <Route
              path="/AllProducts/:category"
              element={<CategoryProducts />}
            />
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

              <Route
                path="Forget-Password"
                element={<ForgetPassword />}
              ></Route>
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
