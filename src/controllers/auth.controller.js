const USUARIO_VALIDO = "admin";
const PASSWORD_VALIDO = "1234";
const TOKEN = "helpdesk-token-123";

function login(req, res) {
  const { usuario, password } = req.body;

  if (usuario === USUARIO_VALIDO && password === PASSWORD_VALIDO) {
    return res.status(200).json({ token: TOKEN });
  }

  return res.status(401).json({ mensaje: "Acceso no autorizado" });
}

module.exports = { login, TOKEN };
