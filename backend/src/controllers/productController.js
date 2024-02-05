const dbConnection=require("../db/dbConnection");
const Response = require("../utils/response");

const productGetAll= async (req,res)=>{
    try {
        const [rows, fields] = await dbConnection.execute('SELECT * FROM product');
        return new Response(rows).success(res);
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ success:false, error: "Internal server error" });
    }
}

const productGetByID=async(req,res)=>{
    try {
        const id=req.params.id;

        const [rows, fields] = await dbConnection.execute('SELECT * FROM product WHERE id=?',[id]);
        if (rows[0] !== undefined){
            return new Response(rows).success(res);
        }
        else{
            return new Response().error404(res);
        }
        
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ success:false, error: "Internal server error" });
    }
}

const productCreate=async(req,res)=>{
    try {
        const { productName, ageRange, packageQuantity, price, barcode, description, categoryId } = req.body;
        await dbConnection.execute('INSERT INTO product (productName, ageRange, packageQuantity, price, barcode, description, categoryId) VALUES (?,?,?,?,?,?,?)', [productName, ageRange, packageQuantity, price, barcode, description, categoryId]);
        return new Response(null,"Product Created").created(res);
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ success:false, error: "Internal server error" });
    }
}

const productUpdateById=async(req,res)=>{
    try {
        const { productName, ageRange, packageQuantity, price, barcode, description, categoryId } = req.body;
        const productId = req.params.id;
        
        // Kategoriyi seç ve kontrol et
        const [rows, fields] = await dbConnection.execute('SELECT * FROM product WHERE id=?', [productId]);
        if (rows.length > 0) { 
            await dbConnection.execute('UPDATE product SET productName = ?, ageRange = ?, packageQuantity = ?, price = ?, barcode = ?, description = ?, categoryId = ? WHERE id = ?', [productName, ageRange, packageQuantity, price, barcode, description, categoryId, productId]);
            
            return new Response().success(res);
        } else {
            return new Response().error404(res);
        }
    } catch (error) {
        console.error("Product update error:", error);
        return res.status(500).json({ success: false, error: "Server error: Failed to update product." });
    }   
}

const productDeleteById=async(req,res)=>{
    try {
        const productId = req.params.id;

        const [rows, fields] = await dbConnection.execute('SELECT * FROM product WHERE id=?', [productId]);
        if (rows.length > 0) { 
            await dbConnection.execute('DELETE FROM product WHERE id = ?', [productId]);
            return new Response().success(res);
        } else {
            return new Response().error404(res);
        }
    } catch (error) {
        console.error("Product delete error:", error);
        return res.status(500).json({ success: false, error: "Server error: Failed to delete product." });
    }
}


module.exports={
    productGetAll,
    productGetByID,
    productCreate,
    productUpdateById,
    productDeleteById
}