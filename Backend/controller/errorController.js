const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorPro = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong, please try again later.",
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV == "production") {
    let error = { ...err };
    sendErrorPro(error, res);
  } else if (process.env.NODE_ENV == "development") {
    sendErrorDev(err, res);
  }
};

module.exports = globalErrorHandler;

// 500 Internal Server Error for server errors  (like database down, network issues etc.)  // 400 Bad Request for client errors (like invalid request parameters)  // 200 OK for success  (like user created, item fetched etc.)  // 300 Redirect for redirection (like login required etc.)  // 403 Forbidden for access denied (like user not authenticated etc.)  // 404 Not Found for resource not found (like user not found etc.)  // 500 Internal Server Error for server errors  (like database down, network issues etc.)  // 400 Bad Request for client errors (like invalid request parameters)  // 200 OK
