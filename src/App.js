import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageRoutePath } from "./utils/config";
import { ApplicationPages } from "./pages/index";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* if get auth */}
        {/* <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Home/>}/>
          </Route> */}
        <Route
          exact
          path={PageRoutePath.LOGIN}
          element={<ApplicationPages.Login />}
        />

        <Route
          exact
          path={PageRoutePath.HOME}
          element={<ApplicationPages.Home />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
