const express = require("express");
const userModel = require("../Models/users");
const router = express.Router();
router.post("/newuser", async (req, res) => {
  try {
    const { name, gender, email, mobile, category } = req.body;
    const profileImage = req.file ? req.file.filename : undefined;

    const newUser = await userModel.create({
      name,
      gender,
      email,
      mobile,
      category,
      profileImage,
    });

    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.get("/user", async (req, res) => {
  res.json(await userModel.find());
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await userModel.findById(id));
});

router.get("/getfile/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(
    "C:/Users/prakhar.saraswat/Desktop/New folder/backend/public/uploads" +
      filename
  );
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, email, mobile, category } = req.body;
    const profileImage = req.file ? req.file.filename : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        name,
        gender,
        email,
        mobile,
        category,
        profileImage,
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await userModel.findByIdAndDelete(id));
});

module.exports = router;
