<<<<<<< HEAD
=======
import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  About,
  ConfimAkun,
  ForgotPassword,
  Home,
  Login,
  Menu,
  NotFound,
  RegisterAdmin,
  SignUp,
  UpdatePassword,
} from "./pages/landing";

import {
  AkunUser,
  Checkout,
  Daftar,
  HomeUser,
  Order,
  Pesanan,
  PesananUser,
  Users,
} from "./pages/user";
import { useEffect, useState } from "react";

import { Header, NavbarCms, Side } from "./components";
import {
  CheckedOrderCms,
  CreateProductCms,
  Dashboard,
  DoneOrderCms,
  EditProductCms,
  HomeCms,
  NewOrderCms,
  OrderCms,
  ProductCms,
  ReportCms,
  UserCms,
} from "./pages/cms";

function App() {
  const token = sessionStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        setIsLogin(false);
      }, 1000);
    }

    setTimeout(() => {
      setIsLogin(true);
    }, 1000);
  }, []);

  //!! =============== ROUTE PATH USER ===================
  if (JSON.parse(sessionStorage.getItem("ROLE")) === "user" && isLogin) {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/user" element={<Users />}>
            <Route path="" element={<HomeUser />} />
            <Route path="menu" element={<Daftar />} />
            <Route path="menu/co/:id" element={<Order />} />
            <Route path="order" element={<PesananUser />}>
              <Route path="" element={<Checkout />} />
              <Route path="pesanan" element={<Pesanan />} />
            </Route>
            <Route path="akun" element={<AkunUser />} />
          </Route>
        </Routes>
      </>
    );
  }

  //? =============== ROUTE PATH ADMIN ===================
  if (isLogin && token) {
    return (
      <div className="d-flex">
        <div className="w-auto position-fixed z-3">
          <Side />
        </div>
        <div className="z-2">
          <NavbarCms />
        </div>
        <div className="container-fluid pb-5">
          <Routes>
            <Route path="/adm" element={<Dashboard />}>
              <Route path="" element={<HomeCms />} />
              <Route path="user" element={<UserCms />} />

              <Route path="produk" element={<ProductCms />} />
              <Route path="product/create" element={<CreateProductCms />} />
              <Route path="product/edit/:id" element={<EditProductCms />} />
              <Route path="order" element={<OrderCms />}>
                <Route path="" element={<NewOrderCms />} />
                <Route path="check" element={<CheckedOrderCms />} />
                <Route path="done" element={<DoneOrderCms />} />
              </Route>
              <Route path="report" element={<ReportCms />} />
              <Route path="profil" element={<AkunUser />} />
            </Route>
          </Routes>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ROUTES LANDING PAGE */}

      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<Menu />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/admin" element={<RegisterAdmin />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/password/:id" element={<UpdatePassword />} />
        <Route path="/confirm/:id" element={<ConfimAkun />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
>>>>>>> b812c8a
