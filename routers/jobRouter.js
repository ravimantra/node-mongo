const express = require('express');
const router = express.Router();
const Job = require('../models/job.model');
const verifyToken = require('../utils/verifyToken');


router.get('/job', verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json({ allJobs: jobs });
  } catch(err) {
    res.send('Error', err);
  }
});

router.get('/job/:id', verifyToken, async (req, res) => {
  try {
    const data = await Job.findById(req.params.id)
    res.json(data);
  } catch(err) {
    res.send(err);
  }
});

router.post('/job', async (req, res) => {
  const jobs = new Job({
    title: req.body.title,
    location: req.body.location
  });
  try {
    await jobs.save()
    res.status(200).send();
  } catch(err) {
    res.send(err);
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const data = await Job.findById(req.params.id) 
    data.title = req.body.title;
    data.location = req.body.location;
    const updatedData = await data.save();
    res.json(updatedData)   
  } catch(err) {
    res.send(err);
  }
});

router.delete('/job/:id', verifyToken, async (req, res) => {
  try {
    const data = await Job.findById(req.params.id);
    const deleteInfo = await data.remove();
    res.json(deleteInfo);
  } catch(err) {
    res.send(err);
  }
});

module.exports = router;