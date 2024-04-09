const jwt = require("jsonwebtoken");
const dbConnection=require("../../db/dbConnection.js");
const APIError = require("../../utils/errors.js");

const createToken = async (user, res) => {
    try {
        const payload = {
            sub: user.id,
            username: user.full_name,
            role:user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            algorithm: "HS512",
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        return res.status(201).json({
            success: true,
            token,
            message: "Giriş işlemi başarılı"
        });
    } catch (error) {
        console.error("Token oluşturma hatası:", error);
        return res.status(500).json({
            success: false,
            message: "Token oluşturma hatası"
        });
    }
}

const tokenCheck = async (authorizationHeader) => {
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return false; // Geçersiz oturum, oturum açılmamış
    }

    const token = authorizationHeader.split(" ")[1];

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const [rows, fields] = await dbConnection.execute('SELECT * FROM users WHERE id = ? AND role = ?', [decoded.sub, decoded.role]);
        
        if (!rows[0]) {
            return false; // Geçersiz token
        }
        
        return true; // Token doğru olduğu için true döner
    } catch (error) {
        return false; // Token doğrulanamadı
    }
}


const tokenCheckAdmin = async (req, res, next) => {
    try {
        const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");

        if (!headerToken)
            throw new APIError("Geçersiz Oturum Lütfen Oturum Açın", 401);

        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const [rows, fields] = await dbConnection.execute('SELECT id, email FROM Users WHERE id = ? AND role = ?', [decoded.sub, decoded.role]);
        
        if (!rows[0])
            throw new APIError("Geçersiz Token", 401);
        
        if (decoded.role !== process.env.ADMIN_ROLE) {
            throw new APIError("Geçersiz Yetki", 401);
        }

        req.user = rows[0];
        next();
    } catch (error) {
        next(error); // Hata middleware'e yönlendirilir
    }
}
const tokenCheckUser = async (req, res, next) => {
    try {
        const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");
        if (!headerToken)
            throw new APIError("Geçersiz Oturum Lütfen Oturum Açın", 401);

        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const [rows, fields] = await dbConnection.execute('SELECT full_name,company_name, email,phone_number FROM Users WHERE id = ? AND role = ?', [decoded.sub, decoded.role]);
        
        if (!rows[0])
            throw new APIError("Geçersiz Token", 401);

        req.user = rows[0];
        next();
    } catch (error) {
        next(error); // Hata middleware'e yönlendirilir
    }
}
module.exports = {
    createToken,
    tokenCheck,
    tokenCheckAdmin,
    tokenCheckUser
}
