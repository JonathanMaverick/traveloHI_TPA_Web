import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user-context";
import LoginPage from "./pages/login/login-page";
import RouteMiddleware from "./routes/route-middleware";
import RegisterPage from "./pages/register/register-page";
import './styles/main.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path= "/*" element={<RouteMiddleware />} />
            </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
