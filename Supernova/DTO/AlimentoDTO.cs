namespace Supernova.DTO
{
    public class AlimentoDTO
    {
        public string Nome { get; set; }

        public string Descricao { get; set; }

        public IFormFile? Imagem { get; set; }

        public decimal Preco { get; set; }

        public Guid IdTipoAlimento { get; set; }
    }
}