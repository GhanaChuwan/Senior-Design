const jwt = require("jsonwebtoken");
const User = require("../../models/user.js");
exports.isAuth = async (req, res, next) => {
  //console.log(req);
  try {
    if (
      req.headers.authorization === undefined ||
      req.headers.authorization == null
    ) {
      return res.json({ message: "unauthorized access!", success: false });
    }
    const token = req.headers.authorization.split(" ")[1];

    console.log(token);

    let decodedData;

    if (token != null) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedData);

      req.user = decodedData;
      next();
    } else {
      return res.json({ message: "unauthorized access!", success: false });
    }
  } catch (error) {
    return res.json({ message: "unauthorized access!", success: false });
  }
};
