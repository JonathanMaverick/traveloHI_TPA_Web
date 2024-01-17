import { BrowserRouter, Route, Routes } from "react-router-dom";
import useUser, { UserProvider } from "./contexts/user-context";
import LoginPage from "./pages/login/login-page";
import RegisterPage from "./pages/register/register-page";
import './styles/main.scss';
import UserRouteMiddleware from "./routes/user-route-middleware";
import GuestRouteMiddleware from "./routes/guest-route-middleware";
import AdminRouteMiddleware from "./routes/admin-route-middleware";

function App() {

  return (
    <>
      <BrowserRouter>
        <UserProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path= "admin/*" element={<AdminRouteMiddleware />} />
              <Route path= "/user/*" element={<UserRouteMiddleware />} />
              <Route path= "/*" element={<GuestRouteMiddleware />} />
            </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
