import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./pages/Landing";

import MainCategoriesPage from "./pages/MainCategoriesPage";
import IconsPage from "./pages/IconsPage";
import SubIconsPage from "./pages/SubIconsPage";
import SubIconDetail from "./pages/SubIconDetail";
import TimePeriodsPage from "./pages/TimePeriodsPage";
import EmergencyPage from "./pages/EmergencyPage";
import TrainingPage from "./pages/TrainingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/main-categories" element={<MainCategoriesPage />} />

        <Route path="/maincategories/:mainCategoryId/timeperiods" element={<TimePeriodsPage />} />
        <Route path="/timeperiods/:timePeriodId/icons" element={<IconsPage />} />

        <Route path="/icons/:mainCategoryId" element={<IconsPage />} />

        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/training" element={<TrainingPage />} />

        <Route path="/subicons/:iconId" element={<SubIconsPage />} />
        <Route path="/icons/:iconId/subicons/:subIconId" element={<SubIconDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
