using Supernova.Models;

namespace Supernova.Interfaces
{
    public interface IAlimentoRepository
    {
        void Cadastrar(Alimento alimento);
        void Atualizar(Guid id, Alimento alimento);
        void Deletar(Guid id);
        List<Alimento> Listar();
        Alimento BuscarPorId(Guid id);
    }
}