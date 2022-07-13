import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Shop from './pages/shop/Shop';
import Error from './pages/Error';
import Orders from './pages/shop/Orders';
import Layout from './utils/Layout';
import DashLayout from './utils/DashLayout';
import Profile from './pages/Profile';
import { Spinner } from './components';
import Favorites from './pages/Favorites';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductPage from './pages/shop/ProductPage';
import SingleCategory from './pages/shop/SingleCategory';
import Dashboard from './pages/vendor/Dashboard';
import Create from './pages/vendor/Create';
import Inventory from './pages/vendor/Inventory';
import Reports from './pages/vendor/Reports';
import Ledger from './pages/vendor/Ledger';
import Activation from './pages/Activation';
import { AuthProvider } from './context/AuthContext';
import FullfilledOrder from './pages/vendor/FullfilledOrder';
import PendingOrders from './pages/vendor/PendingOrders';
import { CartProvider } from './context/CartContext';
import ProtectedCosRoutes from './app/ProtectedCosRoutes';

const HomePage = React.lazy(() => import('./pages/Home'));
const CartPage = React.lazy(() => import('./pages/shop/Cart'));
const SearchPage = React.lazy(() => import('./pages/Search'));
const BillingPage = React.lazy(() => import('./pages/shop/Billing'));
const ShippingPage = React.lazy(() => import('./pages/shop/Shipping'));
const SuccessPage = React.lazy(() => import('./pages/Success'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/spinner' element={<Spinner />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/search' element={<SearchPage />} />

                <Route path='login' element={<Login />} />
                <Route path='activation' element={<Activation />} />
                <Route path='category/:name/:id' element={<SingleCategory />} />
                <Route path='signup' element={<Signup />} />
                <Route path='product/:id' element={<ProductPage />} />

                <Route path='/cart' element={<CartPage />}>
                  <Route index element={<Orders />} />
                  <Route path='billing' element={<BillingPage />} />
                  <Route path='shipping' element={<ShippingPage />} />
                  <Route path='done' element={<SuccessPage />} />
                  <Route path='*' element={<Error />} />
                </Route>
                {/* <Route path='/profile' element={<Profile />} /> */}
                <Route
                  path='profile'
                  element={
                    <ProtectedCosRoutes>
                      <Profile />
                    </ProtectedCosRoutes>
                  }
                />
              </Route>

              <Route path='/dashboard' element={<DashLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='create' element={<Create />} />
                <Route path='inventory' element={<Inventory />} />
                <Route path='ledger' element={<Ledger />} />
                <Route path='orders' element={<PendingOrders />} />
                <Route path='fullfilled-orders' element={<FullfilledOrder />} />
                <Route path='reports' element={<Reports />} />
                <Route path='*' element={<Error />} />
              </Route>

              <Route path='*' element={<Error />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
