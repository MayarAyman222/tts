//import logo from './logo.svg';
//import Translator from './components/Translator';
// App.js
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

        {/* الصفحة الرئيسية: تعرض Main Categories */}
       <Route path="/main-categories" element={<MainCategoriesPage />} />


        {/* صفحة Icons: تعرض Icons خاصة بالـ main category */}
        <Route path="/icons/:mainCategoryId" element={<IconsPage />} />

        {/* صفحة SubIcons: تعرض SubIcons خاصة بالـ Icon */}
        <Route path="/subicons/:iconId" element={<SubIconsPage />} />
        <Route path="/icons/:iconId/subicons/:subIconId" element={<SubIconDetail />} />


      </Routes>
    </Router>
  );
}

export default App;
