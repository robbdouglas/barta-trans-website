import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import News from "./components/News";
import Services from "./components/Services";
import Jobs from "./components/Jobs";
import Contact from "./components/Contact";
import Impressum from "./components/Impressum";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/news" element={<News />} />
          <Route path="/services" element={<Services />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="*" element={<h1>ERROR 404: PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
