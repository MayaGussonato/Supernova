using Microsoft.AspNetCore.Mvc;
using Supernova.DTO;
using Supernova.Interfaces;
using Supernova.Models;

namespace Supernova.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoAlimentoController : ControllerBase
    {
        private readonly ITipoAlimentoRepository _tipoRepository;

        public TipoAlimentoController(ITipoAlimentoRepository tipoRepository)
        {
            _tipoRepository = tipoRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tipoRepository.Listar());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var tipo = _tipoRepository.BuscarPorId(id);

            if (tipo == null)
                return NotFound();

            return Ok(tipo);
        }

        [HttpPost]
        public IActionResult Post(TipoAlimentoDTO dto)
        {
            TipoAlimento tipo = new TipoAlimento
            {
                Nome = dto.Nome
            };

            _tipoRepository.Cadastrar(tipo);

            return StatusCode(201);
        }
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, TipoAlimento tipoAlimento)
        {
            _tipoRepository.Atualizar(id, tipoAlimento);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            _tipoRepository.Deletar(id);

            return NoContent();
        }
    }
}