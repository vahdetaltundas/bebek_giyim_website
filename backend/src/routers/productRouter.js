const router=require("express").Router();
const {productGetAll,productGetByID,productCreate,productUpdateById,productDeleteById}=require("../controllers/productController")
const {tokenCheckAdmin,tokenCheck}=require("../middlewares/validations/auth.js");

router.get("/:id",tokenCheck,productGetByID);
router.get("/",tokenCheck,productGetAll);
router.post("/",tokenCheckAdmin,productCreate);
router.put("/:id",tokenCheckAdmin,productUpdateById);
router.delete("/:id",tokenCheckAdmin,productDeleteById);


module.exports=router;