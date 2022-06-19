import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageRoutePath } from "./utils/config";
import { ApplicationPages } from "./pages/index";
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
                <ApplicationPages.Home />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path={PageRoutePath.LOGIN}
          element={
            <PublicRoute>
              <ApplicationPages.Login />{" "}
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
              <ApplicationPages.Register />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
