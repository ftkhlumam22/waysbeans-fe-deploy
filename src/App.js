import * as React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import AddProduct from './pages/admin/AddProduct';
import Dashboard from './pages/admin/Dashboard';
import ListProducts from './pages/admin/ListProducts';
import DetailProduk from './pages/main/DetailProduk';
import Homepage from './pages/main/Homepage';
import ProfileDetails from './pages/main/ProfileDetails';
import Cart from './pages/transaksi/Cart';
import { API, setAuthToken } from './config/api';
import { UserContext } from './context/userContext';
import UpdateProduct from './pages/admin/UpdateProduct';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = React.useContext(UserContext);

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      let payload = response.data.data.user;

      payload.token = localStorage.token;

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, [state]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/detail-products/:id" element={<DetailProduk />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/list-products" element={<ListProducts />} />
      </Routes>
    </>
  );
}

export default App;
