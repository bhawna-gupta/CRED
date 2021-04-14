const jwt =require('jsonwebtoken');
const dotenv = require('dotenv');
let {
  errorMessage, status,
} = require('../helpers/status');

dotenv.config();

const verifyToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    errorMessage.error = 'Token not provided';
    return res.status(status.bad).send(errorMessage);
  }
  try {
    const decoded =  jwt.verify(token, process.env.SECRET);
    req.user = {
      email: decoded.email,
      user_id: decoded.user_id,
      name: decoded.name,
    };
    next();
  } catch (error) {
    errorMessage.error = 'Authentication Failed';
    return res.status(status.unauthorized).send(errorMessage);
  }
};

module.exports= {verifyToken};
