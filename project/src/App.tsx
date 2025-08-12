
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./screens/LandingPage";
import { AuthenticatedLandingPage } from "./screens/LandingPage/AuthenticatedLandingPage";
import { AboutUsPage } from "./screens/AboutUsPage";
import { ExercisesPage } from "./screens/ExercisesPage";
import { AchievementsAndTherapyPage } from "./screens/AchievementsAndTherapyPage";
import WelcomePage from "./screens/LoginPage/welcome";
import { AdminDashboard } from "./screens/AdminDashboard/AdminDashboard";
import AppointmentsList from "./screens/LoginPage/AppointmentsList";
import { CharactersPage } from "./screens/CharactersPage";
import { PetsPage } from "./screens/PetsPage";
import { GemsPage } from "./screens/GemsPage";
import { PackagesPage } from "./screens/PackagesPage";
import { ProfilePage } from "./screens/ProfilePage/ProfilePage";
import TherapyTypesPage from "./screens/TherapyTypesPage";
import { AchievementsPage } from "./screens/AchievementsPage/AchievementsPage";
import { AuthProvider } from "./lib/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<AuthenticatedLandingPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/administrador" element={<AdminDashboard />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/gems" element={<GemsPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/achievements-therapy" element={<AchievementsAndTherapyPage />} />
          <Route path="/therapy-types" element={<TherapyTypesPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
