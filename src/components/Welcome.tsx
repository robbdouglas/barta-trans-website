import { Link } from "react-router-dom";
import Footer from "./Footer";

function Welcome() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>This is the Welcome page.</p>
      <Link to="/news">
        <button>News</button>
      </Link>
      <Footer />
    </div>
  );
}

export default Welcome;
