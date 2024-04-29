const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({ ...req.body, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("Benutzer nicht gefunden");
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).send("Ungültiges Passwort");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  const hashedPassword = req.body.password
    ? await bcrypt.hash(req.body.password, 10)
    : undefined;
  try {
    const update = {
      ...req.body,
      ...(hashedPassword && { password: hashedPassword }),
    };
    const updatedUser = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};
