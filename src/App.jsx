import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Generator from "./pages/Generator";
import FallbackMessage from "./components/FallbackMessage";
import Editor from "./pages/Editor";
function App() {
  return (
    <>
      <FallbackMessage />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
