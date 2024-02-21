const router=require("express").Router();
const {productGetAll,productGetByID,productCreate,productUpdateById,productDeleteById, productImageUrl}=require("../controllers/productController")
const {tokenCheckAdmin}=require("../middlewares/validations/auth.js");

router.get("/:id",productGetByID);
router.get("/",productGetAll);
router.post("/",tokenCheckAdmin,productCreate);
router.put("/:id",tokenCheckAdmin,productUpdateById);
router.delete("/:id",tokenCheckAdmin,productDeleteById);
router.get("/image/:id",productImageUrl);


module.exports=router;