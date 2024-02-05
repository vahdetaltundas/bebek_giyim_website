const router=require("express").Router();
const authRouter=require("./authRouter.js");
const categoryRouter=require("./categoryRouter.js");
const productRouter=require("./productRouter.js");

router.use("/auth",authRouter);
router.use("/categories",categoryRouter);
router.use("/products",productRouter);

module.exports=router