module.exports = function(app) {
  // Allow all hosts
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
};
