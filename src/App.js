import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageRoutePath } from "./utils/config";
import {
  Home,
  Login,
  Register,
  Products,
  DetailProduct,
  Cart,
  Summary,
} from "./pages/index";
import PublicRoute from "./utils/Routes/PublicRoute";
import PrivateRoute from "./utils/Routes/PrivateRoute";

import Layout from "./components/template/layout";

// import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* if get auth */}
        {/* <PrivateRoute
          path={PageRoutePath.HOME}
          element={<ApplicationPages.Home />}
        /> */}

        <Route
          path={PageRoutePath.HOME}
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path={PageRoutePath.PRODUCTS}
          element={
            <PrivateRoute>
              <Layout>
                <Products />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path={PageRoutePath.DETAIL_PRODUCTS}
          element={
            <PrivateRoute>
              <Layout>
                <DetailProduct />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path={PageRoutePath.CART}
          element={
            <PrivateRoute>
              <Layout>
                <Cart />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path={PageRoutePath.SUMMARY}
          element={
            <PrivateRoute>
             <Layout>
                <Summary />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path={PageRoutePath.LOGIN}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* <Route
          path={PageRoutePath.HOME}
          element={<ApplicationPages.Home />}
        /> */}

        <Route
          path={PageRoutePath.REGISTER}
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
