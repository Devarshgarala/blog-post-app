import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthorPage from "./components/AuthorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/author/:authorSlug" element={<AuthorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
