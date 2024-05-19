import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

export const generateToken = (payload: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token as string);
    });
  });
};

export default generateToken;
