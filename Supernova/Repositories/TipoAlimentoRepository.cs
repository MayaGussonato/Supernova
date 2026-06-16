using Supernova.BdContextConnct;
using Supernova.Interfaces;
using Supernova.Models;

namespace Supernova.Repositories
{
    public class TipoAlimentoRepository : ITipoAlimentoRepository
    {
        private readonly SuperNovaContext _context;

        public TipoAlimentoRepository(SuperNovaContext context)
        {
            _context = context;
        }

        public void Cadastrar(TipoAlimento tipoAlimento)
        {
            _context.TipoAlimentos.Add(tipoAlimento);
            _context.SaveChanges();
        }

        public List<TipoAlimento> Listar()
        {
            return _context.TipoAlimentos.ToList();
        }

        public TipoAlimento BuscarPorId(Guid id)
        {
            return _context.TipoAlimentos.FirstOrDefault(t => t.IdTipoAlimento == id);
        }

        public void Atualizar(Guid id, TipoAlimento tipoAlimento)
        {
            var tipoBuscado = BuscarPorId(id);

            if (tipoBuscado == null)
                return;

            tipoBuscado.Nome = tipoAlimento.Nome;

            _context.TipoAlimentos.Update(tipoBuscado);
            _context.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            var tipoBuscado = BuscarPorId(id);

            if (tipoBuscado != null)
            {
                _context.TipoAlimentos.Remove(tipoBuscado);
                _context.SaveChanges();
            }
        }
    }
}