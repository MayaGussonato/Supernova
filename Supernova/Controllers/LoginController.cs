using Microsoft.AspNetCore.Mvc;
using Supernova.DTO;
using Supernova.Interfaces;

namespace Supernova.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public LoginController(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        [HttpPost]
        public IActionResult Login(LoginDTO dto)
        {
            var usuario = _usuarioRepository.BuscarPorEmailSenha(
                dto.Email,
                dto.Senha
            );

            if (usuario == null)
            {
                return Unauthorized(new
                {
                    mensagem = "Email ou senha inválidos"
                });
            }

            return Ok(new
            {
                idUsuario = usuario.IdUsuario,
                nome = usuario.Nome,
                email = usuario.Email,
                tipoUsuario = usuario.TipoUsuario
            });
        }
    }
}