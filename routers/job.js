const express = require('express');
const router = express.Router();
const Job = require('../models/job');


router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch(err) {
    res.send('Error', err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Job.findById(req.params.id)
    res.json(data);
  } catch(err) {
    res.send(err);
  }
});

router.post('/', async (req, res) => {
  const jobs = new Job({
    title: req.body.title,
    location: req.body.location
  });
  try {
    const data = await jobs.save()
    res.json(data);
  } catch(err) {
    res.send(err);
  }
});

router.put('/:id', async (req, res) => {
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

module.exports = router;