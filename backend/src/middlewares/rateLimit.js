const rateLimit=require("express-rate-limit");

const apiLimiter=rateLimit({
    windowMs:15*60*1000,
    max:(req,res)=>{
        if(req.url==="/auth/login"||req.url==="/auth/register"){
            return 5;
        }
        if(req.url==="/auth/forget-password"){
            return 3;
        }
        else{
            return 100;
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