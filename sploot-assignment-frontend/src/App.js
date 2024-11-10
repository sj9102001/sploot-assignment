import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BlogPage from "./pages/BlogPage";
import AuthPage from "./pages/AuthPage";
import RequireAuth from "./layout/RequireAuth"; 
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from "./components/BlogDetail";


const App = () => {
  return (
      <>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route element={<RequireAuth />}>
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Route>
        </Routes>
      </>
  );
};

export default App;
