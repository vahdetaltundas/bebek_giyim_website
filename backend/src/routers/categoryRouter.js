const router=require("express").Router();
const {categoryGetAll,categoryGetByID,categoryCreate,categoryUpdateById,categoryDeleteById}=require("../controllers/categoryController")
const {tokenCheckAdmin}=require("../middlewares/validations/auth.js");

router.get("/:id",categoryGetByID);
router.get("/",categoryGetAll);
router.post("/",tokenCheckAdmin,categoryCreate);
router.put("/:id",tokenCheckAdmin,categoryUpdateById);
router.delete("/:id",tokenCheckAdmin,categoryDeleteById);


module.exports=router;