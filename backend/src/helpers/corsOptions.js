const whiteList=["http://localhost:3000"];

const corsOptions=(req,callback)=>{
    let corsOptions;
    console.log(req.header("Origin"));
    if(whiteList.indexOf(req.header("Origin"))!== -1){
        console.log("if içinde");
        corsOptions={origin:true}
    }else{
        console.log("else içinde");
        corsOptions={origin:false}
    }
    callback(null,corsOptions);
}

module.exports=corsOptions;