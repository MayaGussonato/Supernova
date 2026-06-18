using Supernova.BdContextConnct;
using Supernova.DTO;
using Supernova.Interfaces;
using Supernova.Models;

namespace Supernova.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly SuperNovaContext _context;

        public UsuarioRepository(SuperNovaContext context)
        {
            _context = context;
        }

        public void Cadastrar(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();
        }

        public List<Usuario> Listar()
        {
            return _context.Usuarios.ToList();
        }

        public Usuario BuscarPorId(Guid id)
        {
            return _context.Usuarios.FirstOrDefault(u => u.IdUsuario == id);
        }

        public void Atualizar(Guid id, Usuario usuario)
        {
            var usuarioBuscado = BuscarPorId(id);

            if (usuarioBuscado == null)
                return;

            usuarioBuscado.Nome = usuario.Nome;
            usuarioBuscado.Email = usuario.Email;
            usuarioBuscado.Senha = usuario.Senha;

            _context.Usuarios.Update(usuarioBuscado);
            _context.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            var usuarioBuscado = BuscarPorId(id);

            if (usuarioBuscado != null)
            {
                _context.Usuarios.Remove(usuarioBuscado);
                _context.SaveChanges();
            }
        }

        public Usuario BuscarPorEmailSenha(string email, string senha)
        {
            return _context.Usuarios.FirstOrDefault
            (
                u => u.Email == email &&
                     u.Senha == senha
            );


        }
    }
}