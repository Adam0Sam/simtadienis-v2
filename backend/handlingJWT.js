const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const generateJWT = (user, role) => {

    const payload = {
        name: user.name.toLowerCase(),
        surname: user.surname.toLowerCase(),
        role: role,
    };
        
    // Generate JWT token
    const token = jwt.sign(payload, secretKey); 
    
    return token;
}

//for generation of superadmin token
// generateJWT({name: "super", surname: "admin"}, "super admin");

function verifyToken(req, res, next) {
    // Extract the JWT token from the Authorization header
    if(!req.headers?.authorization?.startsWith('Bearer')){
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.err(err);
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        
        req.payload = decoded;
        console.log("PAYLOAD RETRIEVED:", req.payload);
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = { 
    generateJWT, 
    verifyToken, 
 }