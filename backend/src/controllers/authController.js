const dbConnection=require("../db/dbConnection");
const bcrypt=require("bcrypt");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/validations/auth");
const crypto=require("crypto");
const sendEmail = require("../utils/sendMail");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows, fields] = await dbConnection.execute('SELECT * FROM Users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ success:false, message: 'Authentication failed. Email or password not found.' });
        }
        if (rows[0].activation !== 1) {
            return res.status(401).json({ success: false, message: 'Activation not found.' });
        }
        const user = rows[0];

        // Parolaları karşılaştırma
        bcrypt.compare(password, user.password, (error, match) => {
            if (error) {
                console.error("Compare error:", error);
                return res.status(500).json({ success:false, error: "Internal server error" });
            }

            if (match) {
                createToken(user,res)
            } else {
                return res.status(401).json({ success:false, message: 'Authentication failed. Email or password not found.' });
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success:false, error: "Internal server error" });
    }
}

const register = async (req, res) => {
    const { companyName, fullName, email, phoneNumber, password, address } = req.body;

    try {
        // Kullanıcının veritabanında var olup olmadığını kontrol et
        const [existingEmail] = await dbConnection.execute('SELECT email FROM Users WHERE email = ?', [email]);

        // Kullanıcı zaten varsa hata dön
        if (existingEmail.length > 0) {
            return res.status(400).json({ success:false, message: 'Email already exists.' });
        }

        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yeni kullanıcıyı veritabanına ekle
        const insertQuery = 'INSERT INTO Users (company_name, full_name, email, phone_number, password, address) VALUES (?, ?, ?, ?, ?, ?)';
        await dbConnection.execute(insertQuery, [companyName, fullName, email, phoneNumber, hashedPassword, address]);
        return new Response(null,"User registered successfully").created(res);
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ success:false, error: "Internal server error" });
    }
}

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const [rows, fields] = await dbConnection.execute('SELECT email, activation FROM Users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Email not found.' });
        }
        if (rows[0].activation !== 1) {
            return res.status(401).json({ success: false, message: 'Activation not found.' });
        }

        const resetCode = crypto.randomBytes(4).toString("hex");
        await sendEmail({
            from: "baseapitest@outlook.com",
            to: rows[0].email, 
            subject: "Şifre Yenileme",
            text: `Şifreniz yenilenmiştir. Yeni şifreniz: ${resetCode}`
        });

        const hashResetCode = await bcrypt.hash(resetCode, 10);
        await dbConnection.execute('UPDATE Users SET password = ? WHERE email = ?', [hashResetCode, rows[0].email]);

        return res.status(200).json({ success: true, message: "Lütfen mail kutunuzu kontrol ediniz." });
    } catch (error) {
        console.error("Error in forgetPassword function:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}


module.exports={
    login,
    register,
    forgetPassword
}