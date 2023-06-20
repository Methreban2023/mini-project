const errorhandle = (err, req, res, next) => {
  return res.status(500).json({ message: err.message });
};

module.exports = errorhandle;
