const mongoose = require("mongoose");

// Job Schema und Modell importieren
const Job = require("./models/Job.js"); // Passe den Pfad entsprechend an
// News Schema und Modell importieren
const News = require("./models/News.js"); // Passe den Pfad entsprechend an

// Verbindung zur MongoDB herstellen
mongoose.connect("mongodb+srv://WebDevOli:OliveR@data.bd9tmlz.mongodb.net/barta", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Verbindungsfehler:"));
db.once("open", async function() {
  console.log("Verbunden mit der Datenbank");

  // Dummy-Daten erstellen
  const dummyJobs = [
    {
      title: "Software Engineer",
      description: "Entwicklung und Wartung von Softwareanwendungen",
      postedBy: new mongoose.Types.ObjectId(), // Beispiel User ID
    },
    {
      title: "Product Manager",
      description: "Verantwortlich für die Produktentwicklung und -strategie",
      postedBy: new mongoose.Types.ObjectId(), // Beispiel User ID
    },
  ];

  const dummyNews = [
    {
      title: "Neue Produkteinführung",
      content: "Wir freuen uns, unser neuestes Produkt vorzustellen.",
      author: new mongoose.Types.ObjectId(), // Beispiel User ID
    },
    {
      title: "Firmenwachstum",
      content: "Unser Unternehmen wächst stetig und stellt neue Mitarbeiter ein.",
      author: new mongoose.Types.ObjectId(), // Beispiel User ID
    },
  ];

  try {
    // Vorhandene Daten löschen
    await Job.deleteMany({});
    await News.deleteMany({});

    // Dummy-Daten einfügen
    await Job.insertMany(dummyJobs);
    await News.insertMany(dummyNews);

    console.log("Dummy-Daten erfolgreich eingefügt");

    // Verbindung schließen
    mongoose.connection.close();
  } catch (error) {
    console.error("Fehler beim Einfügen der Dummy-Daten:", error);
  }
});
