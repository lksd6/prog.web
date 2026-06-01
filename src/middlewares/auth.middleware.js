const { TOKEN } = require("../controllers/auth.controller");

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || authorization !== `Bearer ${TOKEN}`) {
    return res.status(401).json({ mensaje: "Acceso no autorizado" });
  }

  next();
}

module.exports = authMiddleware;
