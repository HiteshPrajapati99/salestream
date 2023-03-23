import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin Routes

import {
  Login,
  Register,
  RegisterWithEmail,
  Dashbord,
  CreateProduct,
  ViewProduct,
  Home,
  EditProduct,
  Forgotpass,
  CategoriesList,
  CreateCategory,
  Createbrand,
  ListBrand,
  CreateBlog,
  Blog,
  CreateBanner,
  Banner,
  StoreManage,
  CustomerList,
  OrderList
} from "./Admin";

import Page404 from "./pages/Page404";
import { ClientHome } from "./Frontend";
import LandingPage from "./Frontend/pages/Landing";

import { Box, LinearProgress } from "@mui/material";
// Home Routes

const Create = lazy(() => import("./Admin/layout/store/Create"));
const Tamplate = lazy(() => import("./Admin/layout/store/Template"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Box
            width="50%"
            sx={{ position: "absolute", top: "50%", left: "23%" }}
          >
            <LinearProgress color="inherit" />
          </Box>
        }
      >
        <Routes>
          {/*  =============== Admin Routes ==============  */}

          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin/register/email" element={<RegisterWithEmail />} />
          <Route path="/admin/forgot/password" element={<Forgotpass />} />
          <Route path="/admin/*" element={<Page404 />} />

          {/* ============== Private Admin Routes ===========  */}

          <Route path="/admin" element={<Dashbord />}>
            <Route index element={<Home />} />
            <Route path="/admin/home" element={<Home />} />
            <Route path="/admin/products" element={<ViewProduct />} />
            <Route path="/admin/product/create" element={<CreateProduct />} />
            <Route path="/admin/product/Edit/:id" element={<EditProduct />} />
            <Route path="/admin/users" element={<CustomerList />} />
            <Route path="/admin/categories" element={<CategoriesList />} />
            <Route path="/admin/category/create" element={<CreateCategory />} />
            <Route path="/admin/brand" element={<ListBrand />} />
            <Route path="/admin/brands/create" element={<Createbrand />} />
            <Route path="/admin/blogs" element={<Blog />} />
            <Route path="/admin/blog/create" element={<CreateBlog />} />
            <Route path="/admin/blog/edit/:id" element={<CreateBlog />} />
            <Route path="/admin/banner/create" element={<CreateBanner />} />
            <Route path="/admin/banner/edit/:id" element={<CreateBanner />} />
            <Route path="/admin/banners" element={<Banner />} />
            <Route path="/admin/orders" element={<OrderList />} />

            {/* =============== Admin Store Rotes  ==============*/}

            <Route path="/admin/store/create" element={<Create />} />
            <Route path="/admin/store/template" element={<Tamplate />} />
            <Route path="/admin/store/edit/:id" element={<StoreManage />} />
            <Route path="/admin/store/theme/:id" element={<Tamplate />} />
          </Route>

          {/* =============== Landing Page ====================*/}

          <Route path="/" element={<LandingPage />} />

          {/* ============= Template Routing ==================*/}

          <Route path="/:title/*" element={<ClientHome />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
