const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  const newJob = new Job({ ...req.body, postedBy: req.user.userId });
  try {
    await newJob.save();
    res.status(201).send(newJob);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy");
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updatedJob);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};
