const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//importing MODEL newreleases
let ModelUserCartTotal = require("../Models/modelCartTotal");

//get request handle
router.get("/", async (req, res) => {
  try {
    let data = await ModelUserCartTotal.find();
    res.json({ data, message: "All data collected" });
  } catch (error) {
    console.log(error + " data was unable to fetch");
    res.status(500).json({ error: "Data was unable to fetch" });
  }
});

//post request handle
router.post("/", async (req, res) => {
  try {
    let data = ModelUserCartTotal(req.body);
    await data.save();
    res.json({ data, message: "Data is posted" });
  } catch (error) {
    console.log(error + " data was unable to post");
    res.status(500).json({ error: "Data was unable to post" });
  }
});

//put request handle
router.put("/:id", async (req, res) => {
  try {
    let data = await ModelUserCartTotal.findByIdAndUpdate(req.params.id, req.body);
    await data.save();
    res.json({ data, message: "Data is updated" });
  } catch (error) {
    console.log(error + " data was unable to update");
    res.status(500).json({ error: "Data was unable to update" });
  }
});


router.delete("/", async (req, res) => {
  try {
    let data = await ModelUserCartTotal.deleteMany({});
    // await data.save();
    res.json({ data, message: "Data is updated" });
  } catch (error) {
    console.log(error + " data was unable to update");
    res.status(500).json({ error: "Data was unable to update" });
  }
});


module.exports = router;
