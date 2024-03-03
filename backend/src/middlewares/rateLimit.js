const rateLimit=require("express-rate-limit");

const apiLimiter=rateLimit({
    windowMs:1*60*1000,
    max:(req,res)=>{
        if(req.url==="/auth/login"||req.url==="/auth/register"){
            return 150;
        }
        if(req.url==="/auth/forget-password"){
            return 130;
        }
        else{
            return 900000;
        }
    },
    message:{
        success:false,
        message:"Çok fazla istek attınız bir süre bekleyin"
    },
    standardHeaders: 'draft-7',
	legacyHeaders: false,
})

module.exports=apiLimiter;