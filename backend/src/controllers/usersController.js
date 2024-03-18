const dbConnection=require("../db/dbConnection");
const Response = require("../utils/response");

const getAllUsers=async(req,res)=>{
    try {
        const [rows, fields] = await dbConnection.execute("SELECT id,full_name,email,phone_number,activation FROM users where role= ?",["user"]);
        return new Response(rows).success(res);
      } catch (error) {
        console.error("Server error:", error);
        return res
          .status(500)
          .json({ success: false, error: "Internal server error" });
      }
}

const userActivated=async(req,res)=>{
  const userId = req.params.id;
  try {
    const [rows, fields] = await dbConnection.execute('SELECT * FROM users WHERE id=?', [userId]);
    if (rows.length > 0) { 
      await dbConnection.execute('UPDATE users SET activation = ? WHERE id = ?', [1, userId]);
      
      return new Response().success(res);
  } else {
      return new Response().error404(res);
  }
  } catch (error) {
    console.error("User Activation error:", error);
        return res.status(500).json({ success: false, error: "Server error: Failed to user activation." });
  }
}

const userActivatedRemove=async(req,res)=>{
  const userId = req.params.id;
  try {
    const [rows, fields] = await dbConnection.execute('SELECT * FROM users WHERE id=?', [userId]);
    if (rows.length > 0) { 
      await dbConnection.execute('UPDATE users SET activation = ? WHERE id = ?', [0, userId]);
      
      return new Response().success(res);
  } else {
      return new Response().error404(res);
  }
  } catch (error) {
    console.error("User Activation error:", error);
        return res.status(500).json({ success: false, error: "Server error: Failed to user activation." });
  }
}

const userDeleteById = async (req, res) => {
  try {
    const userId = req.params.id;

    const [rows, fields] = await dbConnection.execute(
      "SELECT * FROM users WHERE id=?",
      [userId]
    );
    if (rows.length > 0) {
      await dbConnection.execute("DELETE FROM users WHERE id = ?", [
        userId,
      ]);
      return new Response().success(res);
    } else {
      return new Response().error404(res);
    }
  } catch (error) {
    console.error("User delete error:", error);
    return res
      .status(500)
      .json({
        success: false,
        error: "Server error: Failed to delete User.",
      });
  }
};
module.exports={
    getAllUsers,
    userActivated,
    userActivatedRemove,
    userDeleteById
}