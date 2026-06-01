import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: '15d'
  })

  res.cookie("jwt", token,{
    maxAge:15 * 24 * 60  * 60 * 1000,
    httpOnly: true, // prevent xss attacks cross-site scripting attacks
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  });
};

export default generateTokenAndSetCookie;

// okay we generate jwt token and attach to cookie to make sure that after the user signs up or login when visiting the another page eg: /messages then it will try to verify the jwt token usually the jwt token gets created once the user logs in or signup to generate it takes to arguement in here and is it created by me not given by the function generateTokenAndSetCookie = (userId, res) , the user id comes when the user logs in or sign ups res is the express object like the method we use in here res.cookie. const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15d'}) in here it takes 3 argument 1. is {userid} the reason it is in curley we directly pulled the data in shortcut and payload accepts in objects only{} next the secret its the variable i wrote in the env file , then the options like how long the cookie will stay  then we push the cookie then we send the jwt token to the brower cookie method takes 3 arguement one is the name of the cookie jwt then the token value then the object{} of how to handle the cookie