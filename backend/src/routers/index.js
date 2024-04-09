const router = require("express").Router();
const multer = require("multer");
const {
  upload,
  deleteImagesByNames,
} = require("../middlewares/libs/upload.js");
const authRouter = require("./authRouter.js");
const categoryRouter = require("./categoryRouter.js");
const productRouter = require("./productRouter.js");
const userRouter = require("./userRouter.js");
const APIError = require("../utils/errors.js");
const Response = require("../utils/response.js");
const {
  tokenCheckAdmin,
  tokenCheck,
  tokenCheckUser,
} = require("../middlewares/validations/auth.js");
const dbConnection = require("../db/dbConnection.js");
const sendEmail = require("../utils/sendMail.js");

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/upload/:id", tokenCheckAdmin, function (req, res) {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      throw new APIError("Resim yüklerken Multer kaynaklı hata çıktı", err);
    } else if (err) {
      throw new APIError("Resim yüklerken hata oluştu", err);
    } else {
      const id = req.params.id;
      const [rows, fields] = await dbConnection.execute(
        "SELECT * FROM productImage WHERE productId= ?",
        [id]
      );
      if (rows.length === 0) {
        await dbConnection.execute(
          "INSERT INTO productImage (productId,imageUrl) VALUES (?,?)",
          [id, req.savedImages]
        );
      } else {
        const imageNames = rows[0].imageUrl;
        console.log(imageNames[0]);
        const imageNamesArray = imageNames.split(",");
        deleteImagesByNames(imageNamesArray);
        await dbConnection.execute(
          "DELETE FROM productImage WHERE productId = ?",
          [id]
        );
        await dbConnection.execute(
          "INSERT INTO productImage (productId,imageUrl) VALUES (?,?)",
          [id, req.savedImages]
        );
      }

      return new Response(req.savedImages, "Yükleme Başarılı").success(res);
    }
  });
});
router.use("/orderMail", tokenCheckUser, async function (req, res) {
  try {
    console.log(req.user);
    let { orderMessage } = req.body;
    orderMessage = orderMessage.concat(
      `\n-----------------------------------\nSipariş Veren Kullanıcının Bizim Sistemde Görülen Bilgileri:\n   Sistemdeki Adı Soyadı=${req.user.full_name}\n   Sistemdeki Şirket Adı=${req.user.company_name}\n   Sistemdeki Telefon Numarası=${req.user.phone_number}\n   Sistemdeki Eposta Adresi=${req.user.email}`
    );
    await sendEmail({
      from: "baseapitest@outlook.com",
      to: "vahdetaltundas2323@gmail.com",
      subject: "Yeni Sipariş Maili",
      text: orderMessage,
    });
    return new Response(
      null,
      "Sipariş bilgilerinin tarafımıza iletilmiştir"
    ).created(res);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
