const jwt = require('jsonwebtoken');
const User = require('../../models/user.js')
exports.isAuth = async (req, res, next) => {

    try {
        if (req.headers.authorization === undefined || req.headers.authorization == null) return res.json({ message: "unauthorized access!", success: false })
        const token = req.headers.authorization.split(" ")[1];


        let decodedData;

        if (token != null) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decodedData)


            req.user = decodedData;
        }

        next();
    } catch (error) {
        return res.json({ message: "unauthorized access!", success: false })
    }

};