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
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { CreateProduct, EditProduct } from "./pages/admin";
=======
import { useState } from "react";
import { CreateProduct, Dashboard, EditProduct } from "./pages/admin";
>>>>>>> dcc2c0cd9044c52ef2cdc4ae6870c392feb2e165
import Navigation from "./pages/admin/navigation/navigation.component";
import ProductTable from "./pages/admin/product/product-table.component";
import { UserDsb } from "./pages/admin/User/user";
<<<<<<< HEAD
import RegisterAdmin from "./pages/landing/RegisterAdmin";
<<<<<<< HEAD
import { Header } from "./components";
=======
import OrderNavbar from "./pages/admin/order/order-navbar.component";
import CheckedOrder from "./pages/admin/order/order-table-checked.component";
import AllOrder from "./pages/admin/order/order-table-all.component";
import OrderDone from "./pages/admin/order/order-table-done.component";
>>>>>>> dcc2c0cd9044c52ef2cdc4ae6870c392feb2e165
=======
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
>>>>>>> fe3d71e

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const [isAdmin, setIsAdmin] = useState(true);
  if (isAdmin) {
    return (
      <>
        {/* ROUTES LANDING DASHBOARD */}

        <Routes>
          <Route path="/dsb" element={<Navigation />}>
            <Route path="product" element={<ProductTable />} />
            <Route path="user" element={<UserDsb />} />
            <Route path="order" element={<OrderNavbar />}>
              <Route path="" element={<AllOrder />} />
              <Route path="checked" element={<CheckedOrder />} />
              <Route path="done" element={<OrderDone />} />
            </Route>
            <Route path="product/edit/:id" element={<EditProduct />} />
            <Route path="product/create" element={<CreateProduct />} />
            edit
          </Route>
        </Routes>
      </>
    );
  }

  if (!isLogin) {
    return (
      <>
        {/* ROUTES LANDING PAGE */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/stores" element={<Stores />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/forgot" element={<ForgotPassword />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </>
    );
  }

  if (isLogin) {
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
<<<<<<< HEAD

  // //? =============== ROUTE PATH ADMIN ===================
  // if (isLogin && token) {
  //   return (
  //     <>
  //       {/* ROUTES LANDING DASHBOARD */}
  //       <Routes>
  //         <Route path="/dsb" element={<Navigation />}>
  //           <Route path="product" element={<ProductTable />} />
  //           <Route path="order" element={<OrderTable />} />
  //           <Route path="user" element={<UserDsb />} />
  //           <Route path="order" element={<OrderTable />} />
  //           <Route path="user" element={<UserDsb />} />
  //           <Route path="product/edit/:id" element={<EditProduct />} />
  //           <Route path="product/create" element={<CreateProduct />} />
  //           edit
  //         </Route>
  //       </Routes>
  //     </>
  //   );
  // }

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
=======
>>>>>>> dcc2c0cd9044c52ef2cdc4ae6870c392feb2e165
}

export default App;
