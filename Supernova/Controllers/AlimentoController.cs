using Microsoft.AspNetCore.Mvc;
using Supernova.DTO;
using Supernova.Interfaces;
using Supernova.Models;
using static System.Net.WebRequestMethods;

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
        public async Task<IActionResult> Post([FromForm]AlimentoDTO dto)
        {

            if (String.IsNullOrWhiteSpace(dto.Nome) || dto.IdTipoAlimento == null)
                return BadRequest("É obrigatório que o Alimento tenha Nome e Gênero");

            Alimento novoAlimento = new Alimento();

            if (dto.Imagem != null && dto.Imagem.Length != 0)
            {
                var extensao = Path.GetExtension(dto.Imagem.FileName);
                var nomeArquivo = $"{Guid.NewGuid()}{extensao}";

                var pastaRelativa = "wwwroot/imagens";
                var caminhoPasta = Path.Combine(Directory.GetCurrentDirectory(), pastaRelativa);

                //Garante que a pasta exista
                if (!Directory.Exists(caminhoPasta))
                    Directory.CreateDirectory(caminhoPasta);

                var caminhoCompleto = Path.Combine(caminhoPasta, nomeArquivo);

                using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    await dto.Imagem.CopyToAsync(stream);
                }

                novoAlimento.Imagem = nomeArquivo;
            }

            novoAlimento.IdTipoAlimento = dto.IdTipoAlimento;
            novoAlimento.Nome = dto.Nome;
            novoAlimento.Descricao = dto.Descricao;
            novoAlimento.Preco = dto.Preco;

            try
            {
                _alimentoRepository.Cadastrar(novoAlimento);
                return StatusCode(201);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
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