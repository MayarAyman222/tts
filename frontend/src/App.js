
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./pages/Landing";

import MainCategoriesPage from "./pages/MainCategoriesPage";
import IconsPage from "./pages/IconsPage";
import SubIconsPage from "./pages/SubIconsPage";
import SubIconDetail from "./pages/SubIconDetail";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />

       <Route path="/main-categories" element={<MainCategoriesPage />} />


        <Route path="/icons/:mainCategoryId" element={<IconsPage />} />

        <Route path="/subicons/:iconId" element={<SubIconsPage />} />
        <Route path="/icons/:iconId/subicons/:subIconId" element={<SubIconDetail />} />


      </Routes>
    </Router>
  );
}

export default App;
