using Supernova.Models;

namespace Supernova.Interfaces
{
    public interface IUsuarioRepository
    {
        void Cadastrar(Usuario usuario);

        void Atualizar(Guid id, Usuario usuario);

        void Deletar(Guid id);

        List<Usuario> Listar();

        Usuario BuscarPorId(Guid id);

        Usuario BuscarPorEmailSenha(string email, string senha);
    }
}