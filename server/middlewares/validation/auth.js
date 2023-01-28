const jwt = require('jsonwebtoken');
const User = require('../../models/user.js')
exports.isAuth = async (req, res, next) => {
    console.log("HERE")

    try {
        const token = req.headers.authorization.split(" ")[1];

        let decodedData;

        if (token) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decodedData)


            req.user = decodedData;
        }

        next();
    } catch (error) {
        console.log(error);
        return res.json({message:"unauthorized access!", success:false})
    }

};