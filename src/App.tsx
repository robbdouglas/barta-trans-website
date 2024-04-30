import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import News from "./components/News";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<h1>ERROR 404: PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
