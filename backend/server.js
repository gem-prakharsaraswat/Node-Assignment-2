const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
app.use(express.json());
const port = 5200;
app.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
app.use(upload.single("profileImage"));
app.use(express.static("public"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
const UserRoutes = require("./Routes/UserRoutes");
mongoose.connect(
  "mongodb://localhost:27017"
);
app.use("/view", UserRoutes);
app.listen(port, () => {
  console.log(`server connected at ${port} port`);
});
