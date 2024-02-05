const dbConnection=require("../db/dbConnection");
const bcrypt=require("bcrypt");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/validations/auth");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows, fields] = await dbConnection.execute('SELECT * FROM Users WHERE EMail = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ success:false, message: 'Authentication failed. Email or password not found.' });
        }

        const user = rows[0];

        // Parolaları karşılaştırma
        bcrypt.compare(password, user.PasswordHash, (error, match) => {
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
    const { username, email, password, tel } = req.body;

    try {
        // Kullanıcının veritabanında var olup olmadığını kontrol et
        const [existingEmail] = await dbConnection.execute('SELECT * FROM Users WHERE EMail = ?', [email]);

        // Kullanıcı zaten varsa hata dön
        if (existingEmail.length > 0) {
            return res.status(400).json({ success:false, message: 'Email already exists.' });
        }

        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yeni kullanıcıyı veritabanına ekle
        const insertQuery = 'INSERT INTO Users (UserName, PasswordHash, EMail, Tel, role) VALUES (?, ?, ?, ?, ?)';
        await dbConnection.execute(insertQuery, [username, hashedPassword, email, tel, process.env.DEFAULT_ROLE]);
        return new Response(null,"User registered successfully").created(res);
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ success:false, error: "Internal server error" });
    }
}

module.exports={
    login,
    register
}