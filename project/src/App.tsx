
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./screens/LandingPage";
import WelcomePage from "./screens/LoginPage/welcome";
import AdminPanel from "./screens/LoginPage/AdminPanel";
import AppointmentsList from "./screens/LoginPage/AppointmentsList";
import TherapyTypesPage from "./screens/TherapyTypesPage";
import { CharactersPage } from "./screens/CharactersPage";
import { PetsPage } from "./screens/PetsPage";
import { GemsPage } from "./screens/GemsPage";
import { PackagesPage } from "./screens/PackagesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/admin-appointments" element={<AdminPanel />} />
        <Route path="/administrador" element={<AdminPanel />} />
        <Route path="/appointments" element={<AppointmentsList />} />
        <Route path="/therapy-types" element={<TherapyTypesPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/gems" element={<GemsPage />} />
        <Route path="/packages" element={<PackagesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
