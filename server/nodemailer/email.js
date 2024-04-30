//email.js
const nodemailer = require("nodemailer");
const dotenv = require("dotenv"); 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post('/send-newsletter', async (req, res) => {
  const subscribers = await UserSubscribe.find({ isSubscribed: true });
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    subject: 'Ihr Newsletter',
    text: 'Hier könnte Ihr Newsletter-Text stehen...',
  };
  const sendMailPromises = subscribers.map(subscriber =>
    transporter.sendMail({ ...mailOptions, to: subscriber.email })
  );
  try {
    await Promise.all(sendMailPromises);
    res.status(200).send('Newsletter wurde an alle abonnierten Nutzer gesendet.');
  } catch (error) {
    console.log('Fehler beim Senden des Newsletters:', error);
    res.status(500).send('Fehler beim Senden des Newsletters');
  }
});

