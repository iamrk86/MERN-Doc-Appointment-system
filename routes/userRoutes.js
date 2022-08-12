const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  loginController,
  registerController,
  getUserByIdCtrl,
} = require("../controllers/userCtrl");

const router = express.Router();

// REGISTER ==|== Method POST
router.post("/register", registerController);
//LOGIN ==|== METHOD:POST
router.post("/login", loginController);
//protected route
router.post("/getUserById", authMiddleware, getUserByIdCtrl);

module.exports = router;
