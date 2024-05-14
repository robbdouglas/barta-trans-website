import { Link } from "react-router-dom";
import Footer from "./Footer";
// import Login from "./Login";
// import Subscribe from "./Subscribe";
// import Dashboard from "./Dashboard";

function Welcome() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>This is the Welcome page.</p>
      <Link to="/news">
        <button>News</button>
      </Link>
      {/* <Dashboard /> */}
      {/* <Login /> */}
      {/* <Subscribe /> */}
      <Footer />
    </div>
  );
}

export default Welcome;
