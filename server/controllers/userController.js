const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.createUser = async (req, res) => {
  console.log("Attempting to create user:", req.body.username);
  const { username, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const userExists = await User.findOne({ username });

  if (userExists) {
    console.log("User creation failed: User already exists");
    return res.status(400).send("User already exists");
  }
  const newUser = new User({ username, password: hashedPassword, role });

  try {
    await newUser.save();
    delete newUser.password; // Hide password in response
    console.log("User created successfully:", newUser);
    res.status(201).send(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).send(error);
  }
};

exports.loginUser = async (req, res) => {
  console.log("User login attempt:", req.body.username);
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).select("+role");
    if (!user) {
      console.log("Login failed: User not found");
      return res.status(404).send("Benutzer nicht gefunden");
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log("Login failed: Invalid password");
      return res.status(401).send("Ungültiges Passwort");
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log("User logged in successfully:", user);
    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send(error);
  }
};

exports.getUsers = async (req, res) => {
  console.log("Fetching all users");
  try {
    const users = await User.find();
    console.log("Users fetched successfully:", users);
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  console.log("Updating user with ID:", req.params.id);
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
      select: "-password",
    });
    console.log("User updated successfully:", updatedUser);
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  console.log("Deleting user with ID:", req.params.id);
  try {
    await User.findByIdAndDelete(req.params.id);
    console.log("User deleted successfully");
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).send(error);
  }
};
