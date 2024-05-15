const express = require("express");
const connectDB = require("./dbconnect.js");
const { PORT } = require("./dotenvconfig.js");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const app = express();

const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");
const jobRoutes = require("./routes/jobRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");

app.use(express.json());
app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "https:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "https:"],
      upgradeInsecureRequests: ["'self'"],
    },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 3600000,
    },
  })
);

connectDB();

app.use("/users", userRoutes);
app.use("/news", newsRoutes);
app.use("/jobs", jobRoutes);
app.use("/subscribe", subscribeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Routes: /users, /news, /jobs, /subscribe`);
});
