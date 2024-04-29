const News = require("../models/News");

exports.createNews = async (req, res) => {
  const newNews = new News({ ...req.body, author: req.user.userId });
  try {
    await newNews.save();
    res.status(201).send(newNews);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getNews = async (req, res) => {
  try {
    const news = await News.find().populate("author");
    res.status(200).send(news);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateNews = async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updatedNews);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};
