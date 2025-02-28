import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Generator from "./pages/Generator";
import FallbackMessage from "./components/FallbackMessage";
import Editor from "./pages/Editor";
import Waitlist from "./pages/Waitlist";

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isWaitlistPage = location.pathname === "/waitlist";

  return (
    <>
      {(!isLandingPage && !isWaitlistPage) && <FallbackMessage />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
