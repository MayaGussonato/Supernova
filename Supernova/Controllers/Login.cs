using Microsoft.AspNetCore.Mvc;
using Supernova.DTO;

namespace Supernova.Controllers
{
    [HttpPost]
    [Route("login")]
    public IActionResult Login(LoginDTO dto)
    {
        var usuario =
            _usuarioRepository.BuscarPorEmailSenha(dto);

        if (usuario == null)
        {
            return Unauthorized();
        }

        return Ok(usuario);
    }
}
