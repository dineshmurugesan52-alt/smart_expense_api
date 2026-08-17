const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    try {

        // Read Authorization header
        const authHeader = req.headers.authorization;

        // Check if header exists
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header is missing"
            });
        }

        // Check Bearer format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid Authorization format"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];
        console.log("token:", token);
        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach logged-in user information
        req.user = decoded;

        // Continue to controller
        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid or Expired Token"
        });

    }

};

module.exports = protect;