const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next)=> {
    const tokenheader = req.headers["autherization"];

     if (!tokenheader) {
       return res.status(401).json({ msg: "Unauthorized, no token" });
     }
     const token = tokenheader.split(" ")[1];
     console.log(token);
  
     try {
       const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
       req.user = { username, userid };
       next();
     } catch (err) {
       return res.status(401).json({ msg: "token is not valied" });
     }
}

module.exports = authMiddleware;

// async function authMiddleware(req, res, next) {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer")) {
//         return res.status(401).json({ msg: "Authentication invalid" });
//     }

//     const token = authHeader.split(" ")[1];
//     console.log("Received token:", token);

//     try {
//         const decoded = jwt.verify(token, "secret");
//         console.log("Decoded user:", decoded);

//         const { username, userid } = decoded;
//         req.user = { username, userid };
//         next();
//     } catch (error) {
//         console.error("Authentication error:", error);
//         return res.status(401).json({ msg: "Authentication invalid2" });
//     }
// }

// module.exports = authMiddleware;
