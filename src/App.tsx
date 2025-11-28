import { Routes, Route } from "react-router-dom";
import MainComonent from "./components/mainComponent/Main";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/Signup"
import WorkspaceLayout from "./pages/workspace";
import IDE from "./pages/IDEPage"
import Docs from "./pages/docs"; 
import UseCase from "./pages/usecase";
import Support from "./pages/support";
import SDK from "./pages/SDK";
import Resource from "./pages/Resource";
function App() {



  return (
    <Routes>
      <Route path="/" element={<MainComonent/> } />
      <Route path="/login" element={<LoginPage/> } />
      <Route path="/signup" element={<RegisterPage/> } />
      <Route path="/workspace" element={ <WorkspaceLayout />} />
      <Route path="/ide/:projectId" element={<IDE />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/use-cases" element={<UseCase />} />
      <Route path="/support" element={<Support />} />
      <Route path="/sdk" element={<SDK />} />
      <Route path="/resources" element={<Resource />} />
    </Routes>
  );
}

export default App;
