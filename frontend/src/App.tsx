import { BrowserRouter, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user-context";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>

          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
