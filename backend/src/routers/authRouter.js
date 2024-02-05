const router=require("express").Router();
const {login,register}=require("../controllers/authController.js");
const { tokenCheck } = require("../middlewares/validations/auth.js");
const authValidation = require("../middlewares/validations/authValidation.js");

const dbConnection=require("../db/dbConnection.js");

router.post("/login",authValidation.login, login);

router.post("/register",authValidation.register,register);

router.get("/users",tokenCheck,async(req,res)=>{
    const [rows, fields] = await dbConnection.execute('SELECT * FROM Users');
    res.json(rows[0])
})

module.exports=router;

