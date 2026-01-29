import jwt from "jsonwebtoken";

export const verification = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token" });

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userid = decode.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
