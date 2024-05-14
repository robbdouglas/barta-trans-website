import { Link } from "react-router-dom";
import Footer from "./Footer";
import Login from "./Login";
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
      <Login />
      <Footer />
    </div>
  );
}

export default Welcome;
