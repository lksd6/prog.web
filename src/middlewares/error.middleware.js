function errorMiddleware(error, req, res, next) {
  console.error(error);
  res.status(500).json({ mensaje: "Error interno del servidor" });
}

module.exports = errorMiddleware;
