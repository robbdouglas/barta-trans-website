const News = require("../models/News");

exports.createNews = async (req, res) => {
  console.log("Creating news with data:", req.body);
  const newNews = new News({ ...req.body, author: req.user.userId });
  try {
    await newNews.save();
    console.log("News created successfully:", newNews);
    res.status(201).send(newNews);
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(400).send(error);
  }
};

exports.getNews = async (req, res) => {
  console.log("Fetching all news");
  try {
    const news = await News.find().populate("author");
    console.log("News fetched successfully:", news);
    res.status(200).send(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).send(error);
  }
};

exports.updateNews = async (req, res) => {
  console.log("Updating news with ID:", req.params.id);
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log("News updated successfully:", updatedNews);
    res.status(200).send(updatedNews);
  } catch (error) {
    console.error("Error updating news:", error);
    res.status(400).send(error);
  }
};

exports.deleteNews = async (req, res) => {
  console.log("Deleting news with ID:", req.params.id);
  try {
    await News.findByIdAndDelete(req.params.id);
    console.log("News deleted successfully");
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting news:", error);
    res.status(400).send(error);
  }
};
