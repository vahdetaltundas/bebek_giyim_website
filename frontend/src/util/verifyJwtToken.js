import jwt from 'jsonwebtoken';
export const verifyJwtToken = async (token) => {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      return decoded.role;
    } catch (error) {
      console.log(error);
      return null;
    }
  };