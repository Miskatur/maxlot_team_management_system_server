import { Request, Response, NextFunction } from 'express';
require("dotenv").config();
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  username?: string;
  role?: string;
}

const createJWT = async (user: { username: string; role: string }): Promise<string> => {
  const token = jwt.sign(
    {
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY as string
  );

  return token;
};


export const validateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    res.status(401).json({
      message: 'Unauthorized user. Access denied.',
    });
  else {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
      if (err || typeof decoded === 'string') { // Check if decoded is a string
        return res.status(403).json({
          message: "Invalid or expired token. Access forbidden.",
        });
      } else {
        req.username = (decoded as JwtPayload).username;
        req.role = (decoded as JwtPayload).role;
        next();
      }
    });
  }
};
export const authTokenUtils = {
  createJWT,
  validateToken
};