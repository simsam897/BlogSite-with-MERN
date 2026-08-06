import jwt from "jsonwebtoken";
export const gentoken = (id, username, email) => {
  return jwt.sign(
    {
      id,
      username,
      email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );
};
