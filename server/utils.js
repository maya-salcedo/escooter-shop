import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, 
  process.env.JWT_SECRET || 'somethingsecret',
  {
    expiresIn: '30d'
  }
  );
}

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode; //all information about the user
          next(); //pass user as property of request to the next middleware
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No token' });
  }
};