import jwt from "jsonwebtoken";
export const gentoken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );
};
