using Microsoft.AspNetCore.Mvc;
using Supernova.DTO;
using Supernova.Interfaces;
using Supernova.Models;

namespace Supernova.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlimentoController : ControllerBase
    {
        private readonly IAlimentoRepository _alimentoRepository;

        public AlimentoController(IAlimentoRepository alimentoRepository)
        {
            _alimentoRepository = alimentoRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_alimentoRepository.Listar());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var alimento = _alimentoRepository.BuscarPorId(id);

            if (alimento == null)
                return NotFound();

            return Ok(alimento);
        }

        [HttpPost]
        public IActionResult Post(AlimentoDTO dto)
        {
            Alimento alimento = new Alimento
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                Imagem = dto.Imagem,
                Preco = dto.Preco,
                IdTipoAlimento = dto.IdTipoAlimento
            };

            _alimentoRepository.Cadastrar(alimento);

            return StatusCode(201);
        }

        [HttpPut("{id}")]
        public IActionResult Put(Guid id, Alimento alimento)
        {
            _alimentoRepository.Atualizar(id, alimento);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            _alimentoRepository.Deletar(id);

            return NoContent();
        }
    }
}