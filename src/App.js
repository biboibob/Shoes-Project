import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageRoutePath } from "./utils/config";
import { ApplicationPages } from "./pages/index";
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
          element={<ApplicationPages.Home />}
        />

        <Route
          path={PageRoutePath.LOGIN}
          element={<ApplicationPages.Login />}
        />

        {/* <Route
          path={PageRoutePath.HOME}
          element={<ApplicationPages.Home />}
        /> */}

        <Route
          path={PageRoutePath.REGISTER}
          element={<ApplicationPages.Register />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
