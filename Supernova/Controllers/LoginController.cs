using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Supernova.DTO;
using Supernova.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Supernova.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public LoginController(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        [HttpPost]
        public IActionResult Login(LoginDTO loginDto)
        {
            try
            {
                var usuarioBuscado = _usuarioRepository.BuscarPorEmailSenha(
                    loginDto.Email,
                    loginDto.Senha
                );

                if (usuarioBuscado == null)
                {
                    return NotFound("Email ou Senha Inválidos!");
                }

                // Claims do token
                var claims = new[]
                {
                    new Claim(
                        JwtRegisteredClaimNames.Jti,
                        usuarioBuscado.IdUsuario.ToString()
                    ),

                    new Claim(
                        JwtRegisteredClaimNames.Email,
                        usuarioBuscado.Email
                    ),

                    new Claim(
                        "TipoUsuario",
                        usuarioBuscado.TipoUsuario
                    )
                };

                // Chave do token
                var key = new SymmetricSecurityKey(
                    System.Text.Encoding.UTF8.GetBytes(
                        "supernova-chave-autenticacao-webapi-dev"
                    )
                );

                // Credenciais
                var creds = new SigningCredentials(
                    key,
                    SecurityAlgorithms.HmacSha256
                );

                // Token
                var token = new JwtSecurityToken(
                    issuer: "api_supernova",
                    audience: "api_supernova",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: creds
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            catch (Exception erro)
            {
                return BadRequest(erro.Message);
            }
        }
    }
}