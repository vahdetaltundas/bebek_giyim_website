require("express-async-errors")
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3002;
const cors = require("cors");
const corsOptions=require("./src/helpers/corsOptions.js")

app.use(express.json());
app.use(express.json({limit:"40mb", extended:true, parameterLimit:50000}))

//Cors
app.use(cors(corsOptions))


app.get("/", (req, res) => {
    res.json({ message: "Hoşgeldiniz" });
});

//API Router
const router=require("./src/routers/index.js");

app.use("/api",router);

//Error handler
const errorHandlerMiddleware = require("./src/middlewares/errorhandler.js");
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log(`Server ${port} portunda çalışıyor`);
});
