const router=require("express").Router();
const multer = require("multer");
const {upload, deleteImagesByNames} = require("../middlewares/libs/upload.js");
const authRouter=require("./authRouter.js");
const categoryRouter=require("./categoryRouter.js");
const productRouter=require("./productRouter.js");
const APIError = require("../utils/errors.js");
const Response = require("../utils/response.js");
const { tokenCheckAdmin } = require("../middlewares/validations/auth.js");
const dbConnection=require("../db/dbConnection.js")

router.use("/auth",authRouter);
router.use("/categories",categoryRouter);
router.use("/products",productRouter);
router.use("/upload/:id",tokenCheckAdmin,function(req,res){
    upload(req,res,async function(err){
        if(err instanceof multer.MulterError){
            throw new APIError("Resim yüklerken Multer kaynaklı hata çıktı",err);
        }else if(err){
            throw new APIError("Resim yüklerken hata oluştu",err)
        }else{
            const id=req.params.id;
            const [rows, fields]= await dbConnection.execute("SELECT * FROM productImage WHERE productId= ?",[id]);
            if(rows.length===0){
                await dbConnection.execute('INSERT INTO productImage (productId,imageUrl) VALUES (?,?)', [id,req.savedImages]);
            }else{
                const imageNames=rows[0].imageUrl;
                console.log(imageNames[0]);
                const imageNamesArray = imageNames.split(",");
                deleteImagesByNames(imageNamesArray);
                await dbConnection.execute('DELETE FROM productImage WHERE productId = ?',[id]);
                await dbConnection.execute('INSERT INTO productImage (productId,imageUrl) VALUES (?,?)', [id,req.savedImages]);
            }
            
            return new Response(req.savedImages,"Yükleme Başarılı").success(res)
        }
    })
})


module.exports=router