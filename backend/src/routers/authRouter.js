const router=require("express").Router();
const {login,register,forgetPassword, loginCheck, adminLogin}=require("../controllers/authController.js");
const { tokenCheck } = require("../middlewares/validations/auth.js");
const authValidation = require("../middlewares/validations/authValidation.js");

const dbConnection=require("../db/dbConnection.js");

router.post("/login",authValidation.login, login);

router.post("/register",register);

router.get("/logincheck",loginCheck);

router.post("/forget-password",forgetPassword)
router.post("/adminLogin",adminLogin)
module.exports=router;

