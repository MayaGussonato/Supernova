using Supernova.Models;

namespace Supernova.Interfaces
{
    public interface ITipoAlimentoRepository
    {
        void Cadastrar(TipoAlimento tipoAlimento);
        void Atualizar(Guid id, TipoAlimento tipoAlimento);
        void Deletar(Guid id);
        List<TipoAlimento> Listar();
        TipoAlimento BuscarPorId(Guid id);
    }
}