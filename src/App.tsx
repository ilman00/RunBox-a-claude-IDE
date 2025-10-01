import { Routes, Route } from "react-router-dom";
import MainComonent from "./components/mainComponent/Main";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/Signup"
import WorkspaceLayout from "./pages/workspace";

function App() {



  return (
    <Routes>
      <Route path="/" element={<MainComonent/> } />
      <Route path="/login" element={<LoginPage/> } />
      <Route path="/signup" element={<RegisterPage/> } />
      <Route path="/workspace" element={ <WorkspaceLayout />} />
    </Routes>
  );
}

export default App;
