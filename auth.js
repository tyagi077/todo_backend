const jwt = require("jsonwebtoken");
const SECRET_KEY = "s3cret";

function auth(req, res, next) {
    const token = req.headers.token;

    const response = jwt.verify(token, SECRET_KEY);

    if (response) {
        req.userId = token.userId;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = {
    auth,
    SECRET_KEY
}