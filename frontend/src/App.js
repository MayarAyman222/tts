import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProvider } from "./context/AppContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import MainCategoriesPage from "./pages/MainCategoriesPage";
import IconsPage from "./pages/IconsPage";
import SubIconsPage from "./pages/SubIconsPage";
import SubIconDetail from "./pages/SubIconDetail";
import SubSubIconsPage from "./pages/SubSubIconsPage";
import SubSubIconDetail from "./pages/SubSubIconDetail";
import TimePeriodsPage from "./pages/TimePeriodsPage";
import EmergencyPage from "./pages/EmergencyPage";
import TrainingPage from "./pages/TrainingPage";
import DailyRoutinePage from "./pages/DailyRoutinePage";
import ExpressDrawingPage from "./pages/ExpressDrawingPage";
import Chat from "./pages/Chat";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/main-categories" element={<MainCategoriesPage />} />

          <Route path="/maincategories/:mainCategoryId/timeperiods" element={<TimePeriodsPage />} />
          <Route path="/timeperiods/:timePeriodId/icons" element={<IconsPage />} />

          <Route path="/icons/:mainCategoryId" element={<IconsPage />} />

          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/daily-routine" element={<DailyRoutinePage />} />
          <Route path="/express-drawing" element={<ExpressDrawingPage />} />
          <Route path="/chat" element={<Chat />} />

          <Route path="/subicons/:iconId" element={<SubIconsPage />} />
          <Route path="/icons/:iconId/subicons/:subIconId" element={<SubIconDetail />} />
          <Route
            path="/icons/:iconId/subicons/:subIconId/subsubicons"
            element={<SubSubIconsPage />}
          />
          <Route
            path="/icons/:iconId/subicons/:subIconId/subsubicons/:subSubIconId"
            element={<SubSubIconDetail />}
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
