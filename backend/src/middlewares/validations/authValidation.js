const joi = require("joi");
const APIError = require("../../utils/errors");

class authValidation {
  constructor() {}

  static login = async (req, res, next) => {
    try {
      await joi
        .object({
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
              "string.base": "Email Alanı Normal Metin Olmalıdır",
              "string.empty": "Email Alanı Boş Olamaz !",
              "string.min": "Email Alanı Ez Az 3 Karakter Olmalıdır",
              "string.email": "Lütfen Geçerli Bir Email Giriniz",
              "string.max": "Email Alanı En Fazla 100 Karakterden Oluşabilir",
              "string.required": "Email Alanı Zorunludur",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Şifre Alanı Normal Metin Olmalıdır",
            "string.empty": "Şifre Alanı Boş Olamaz !",
            "string.min": "Şifre Alanı Ez Az 6 Karakter Olmalıdır",
            "string.max": "Şifre Alanı En Fazla 36 Karakterden Oluşabilir",
            "string.required": "Şifre Alanı Zorunludur",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error?.details[0].message)
        throw new APIError(error.details[0].message, 400);
      else throw new APIError("Lütfen Validasyon Kullarına Uyun", 400);
    }
    next();
  };
}

module.exports = authValidation;
