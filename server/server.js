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

// Konfiguration der Content Security Policy CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"], // Entfernt 'unsafe-inline'
      styleSrc: ["'self'", "https:"], // Entfernt 'unsafe-inline'
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "https:"],
      upgradeInsecureRequests: ["'self'"],
    },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 100, // Limit von 100 Anfragen pro Fenster pro IP
});

app.use(limiter);

app.use(
  session({
    secret: "secret",
    saveUninitialized: false, // Geändert zu false, um unnötige Session-Speicherung zu vermeiden
    resave: false,
    cookie: {
      secure: true, // Aktiviert, um nur über HTTPS zu senden
      httpOnly: true,
      maxAge: 3600000, // 1 Stunde
    },
  })
);

connectDB();

app.use("/", appRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
