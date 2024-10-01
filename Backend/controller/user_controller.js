const User = require("../Models/user_model.js")
const catchAsync  = require("../utils/catchAsync.js");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError.js");

createSendToken = (user, StatusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("JWT", token, {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only secure in production
  });
  
  res.status(StatusCode).json({
    message: "User created successfully",
    token,
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
  });
};

// Register User Function
RegisterUser = catchAsync(async (req, res, next) => {
  const { fullname, email, password, changedPasswordAt } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email }).select("+password");
  if (user) {
    return next(new AppError(`User Already exist`, 400));
  }

  const createdUser = new User({
    fullname: fullname,
    email: email,
    password: password,
    changedPasswordAt: changedPasswordAt,
  });
  await createdUser.save();
  createSendToken(createdUser, 201, res);
});

// Login User Function
LoginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(`Please provide email Or password`, 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(new AppError(`Invalid User Or password`, 401));
  }

  createSendToken(user, 200, res);
});

module.exports={
    RegisterUser,
    LoginUser
}