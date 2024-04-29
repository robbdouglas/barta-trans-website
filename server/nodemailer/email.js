const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "deineEmail@gmail.com",
    pass: "deinPasswort",
  },
});

router.post("/send-newsletter", authenticateToken, async (req, res) => {
  try {
    const users = await User.find(); // Hole alle Nutzer aus der Datenbank
    const mailOptions = {
      from: "deineEmail@gmail.com",
      subject: "Ihr Newsletter",
      text: "Hier könnte Ihr Newsletter-Text stehen...",
    };

    const sendMailPromises = users.map((user) => {
      return transporter.sendMail({ ...mailOptions, to: user.email });
    });

    await Promise.all(sendMailPromises);

    res.status(200).send("Newsletter wurde an alle Nutzer gesendet.");
  } catch (error) {
    console.log("Fehler beim Senden des Newsletters:", error);
    res.status(500).send("Fehler beim Senden des Newsletters");
  }
});
