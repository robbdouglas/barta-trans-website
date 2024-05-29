const Job = require("../models/Job");
const translateText = require("./translate");

exports.createJob = async (req, res) => {
  console.log("Creating job with data:", req.body);
  const newJob = new Job({ ...req.body, postedBy: req.user.userId });
  try {
    await newJob.save();
    console.log("Job created successfully:", newJob);
    res.status(201).send(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(400).send(error);
  }
};

exports.getJobs = async (req, res) => {
  console.log("Fetching all jobs");
  try {
    const jobs = await Job.find().populate("postedBy");
    console.log("Jobs fetched successfully:", jobs);

    const targetLang = req.query.lang || 'EN'; // Standardmäßig Englisch, kann durch eine Abfragezeichenkette überschrieben werden

    const translatedJobs = await Promise.all(jobs.map(async (job) => {
      const translatedTitle = await translateText(job.title, targetLang);
      const translatedDescription = await translateText(job.description, targetLang);
      return {
        ...job._doc,
        title: translatedTitle,
        description: translatedDescription,
      };
    }));

    res.status(200).send(translatedJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send(error);
  }
};

exports.updateJob = async (req, res) => {
  console.log("Updating job with ID:", req.params.id);
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log("Job updated successfully:", updatedJob);
    res.status(200).send(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(400).send(error);
  }
};

exports.deleteJob = async (req, res) => {
  console.log("Deleting job with ID:", req.params.id);
  try {
    await Job.findByIdAndDelete(req.params.id);
    console.log("Job deleted successfully");
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(400).send(error);
  }
};
