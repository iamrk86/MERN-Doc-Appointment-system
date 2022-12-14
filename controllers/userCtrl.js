const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorModel = require("../model/doctorModel");

//protected route
const getUserByIdCtrl = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          ...user._doc,
          password: "",
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
      success: false,
      error,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User Not Found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "invalid email or password",
        success: false,
      });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).send({
        message: "login successfull",
        success: true,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "something went wrong login",
      sucess: false,
      error,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({
        message: "ALready User please login",
        success: false,
      });
    }
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({
      message: "New User Created",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      error,
      success: false,
    });
  }
};

const applyDoctorCtrl = async (req, res) => {
  try {
    const newDoctor = new doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const unseenNotification = adminUser.unseenNotification;
    unseenNotification.push({
      type: "new-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
      },
      onClickPath: "/admin/doctors",
    });
    await userModel.findByIdAndUpdate(adminUser._id, { unseenNotification });
    res.status(200).send({
      success: true,
      message: "Doctor account Applyed success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Doctor API ISSUE",
      error,
      success: false,
    });
  }
};
module.exports = {
  loginController,
  registerController,
  getUserByIdCtrl,
  applyDoctorCtrl,
};
