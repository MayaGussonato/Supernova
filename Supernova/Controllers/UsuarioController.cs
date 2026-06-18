using Microsoft.AspNetCore.Mvc;
using Supernova.Interfaces;
using Supernova.Models;

namespace Supernova.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioController(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_usuarioRepository.Listar());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var usuario = _usuarioRepository.BuscarPorId(id);

            if (usuario == null)
                return NotFound();

            return Ok(usuario);
        }

        [HttpPost]
        public IActionResult Post(UsuarioDTO dto)
        {
            Usuario usuario = new Usuario
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Senha = dto.Senha,
                TipoUsuario = dto.TipoUsuario
            };

            _usuarioRepository.Cadastrar(usuario);

            return StatusCode(201);
        }

        [HttpPut("{id}")]
        public IActionResult Put(Guid id, Usuario usuario)
        {
            _usuarioRepository.Atualizar(id, usuario);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            _usuarioRepository.Deletar(id);

            return NoContent();
        }
    }
}