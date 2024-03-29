const express = require("express");
const router = express.Router();

// import userControllers
let { register, login, checkUser } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

//register route
router.post("/register", register);

//login user
router.post("/login", login);

//check user
router.get("/check", authMiddleware, checkUser);
// The /check route in userRouter.js is designed to check the authentication of a user.
// It includes the authMiddleware as a middleware. This ensures that before reaching the checkUser function, the request goes through the authentication middleware.
// If the authentication middleware successfully verifies the token, it sets req.user with the decoded information, and the request is passed to the checkUser function
// In summary, the check user route is protected by the authMiddleware, ensuring that only authenticated users with valid JWTs can access it. The authMiddleware verifies the JWT, and if valid, it sets req.user with the decoded user information. The checkUser function then extracts this information and responds with a success message. If the JWT is invalid or missing, it returns a 401 Unauthorized response. This process helps secure routes that require authentication in your application.

// export
module.exports = router;
