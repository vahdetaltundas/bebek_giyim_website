const dbConnection=require("../db/dbConnection");
const Response = require("../utils/response");

const categoryGetAll= async (req,res)=>{
    try {
        const [rows, fields] = await dbConnection.execute('SELECT * FROM category');
        return new Response(rows).success(res);
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ success:false, error: "Internal server error" });
    }
}

const categoryGetByID=async(req,res)=>{
    try {
        const id=req.params.id;

        const [rows, fields] = await dbConnection.execute('SELECT * FROM category WHERE id=?',[id]);
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

const categoryCreate=async(req,res)=>{
try {
    const { categoryName } = req.body;
    await dbConnection.execute('INSERT INTO category (categoryName) VALUES (?)', [categoryName]);
    return new Response(null,"Category Created").created(res);
} catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success:false, error: "Internal server error" });
}
}

const categoryUpdateById=async(req,res)=>{
    
    try {
        const  newCategoryName  = req.body.categoryName;
        const categoryId = req.params.id;
        
        // Kategoriyi seç ve kontrol et
        const [rows, fields] = await dbConnection.execute('SELECT * FROM category WHERE id=?', [categoryId]);
        if (rows.length > 0) { 
            await dbConnection.execute('UPDATE category SET categoryName = ? WHERE id = ?', [newCategoryName, categoryId]);
            
            return new Response().success(res);
        } else {
            return new Response().error404(res);
        }
    } catch (error) {
        console.error("Category update error:", error);
        return res.status(500).json({ success: false, error: "Server error: Failed to update category." });
    }
}

const categoryDeleteById=async(req,res)=>{
    try {
        const categoryId = req.params.id;

        const [rows, fields] = await dbConnection.execute('SELECT * FROM category WHERE id=?', [categoryId]);
        if (rows.length > 0) { 
            await dbConnection.execute('DELETE FROM category WHERE id = ?', [categoryId]);
            return new Response().success(res);
        } else {
            return new Response().error404(res);
        }
    } catch (error) {
        console.error("Category delete error:", error);
        return res.status(500).json({ success: false, error: "Server error: Failed to delete category." });
    }
}


module.exports={
    categoryGetAll,
    categoryGetByID,
    categoryCreate,
    categoryUpdateById,
    categoryDeleteById
}