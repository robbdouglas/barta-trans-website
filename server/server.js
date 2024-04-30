const express = require("express");
const connectDB = require("./dbconnect.js");
const { PORT } = require("./dotenvconfig.js");
const appRoutes = require("./routes/routes.js");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const app = express();

app.use(express.json());

// Configuration of Content Security Policy CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"], // removed 'unsafe-inline'
      styleSrc: ["'self'", "https:"], // removed 'unsafe-inline'
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "https:"],
      upgradeInsecureRequests: ["'self'"],
    },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minute
  max: 100, // Limit of 100 requests pro Window pro IP
});

app.use(limiter);

app.use(
  session({
    secret: "secret",
    saveUninitialized: false, // Changed to false to avoid unnecessary session storage
    resave: false,
    cookie: {
      secure: true, // Enabled to send over HTTPS only
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    },
  })
);

connectDB();

app.use("/", appRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
