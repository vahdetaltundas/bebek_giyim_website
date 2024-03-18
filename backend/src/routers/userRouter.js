const { getAllUsers, userActivated, userActivatedRemove, userDeleteById } = require("../controllers/usersController");
const { tokenCheckAdmin } = require("../middlewares/validations/auth");

const router = require("express").Router();

router.get("/",tokenCheckAdmin ,getAllUsers);
router.put("/userActivated/:id",tokenCheckAdmin,userActivated);
router.put("/userActivatedRemove/:id",tokenCheckAdmin,userActivatedRemove);
router.delete("/:id",tokenCheckAdmin,userDeleteById);

module.exports=router;