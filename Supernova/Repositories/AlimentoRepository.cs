using Microsoft.EntityFrameworkCore;
using Supernova.BdContextConnct;
using Supernova.Interfaces;
using Supernova.Models;

namespace Supernova.Repositories
{
    public class AlimentoRepository : IAlimentoRepository
    {
        private readonly SuperNovaContext _context;

        public AlimentoRepository(SuperNovaContext context)
        {
            _context = context;
        }

        public void Cadastrar(Alimento alimento)
        {
            _context.Alimentos.Add(alimento);
            _context.SaveChanges();
        }

        public List<Alimento> Listar()
        {
            return _context.Alimentos
                .Include(a => a.IdTipoAlimentoNavigation)
                .ToList();
        }

        public Alimento BuscarPorId(Guid id)
        {
            return _context.Alimentos.FirstOrDefault(a => a.IdAlimento == id);
        }

        public void Atualizar(Guid id, Alimento alimento)
        {
            var alimentoBuscado = BuscarPorId(id);

            if (alimentoBuscado == null)
                return;

            alimentoBuscado.Nome = alimento.Nome;
            alimentoBuscado.Descricao = alimento.Descricao;
            alimentoBuscado.Preco = alimento.Preco;
            alimentoBuscado.Imagem = alimento.Imagem;
            alimentoBuscado.IdTipoAlimento = alimento.IdTipoAlimento;

            _context.Alimentos.Update(alimentoBuscado);
            _context.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            var alimentoBuscado = BuscarPorId(id);

            if (alimentoBuscado != null)
            {
                _context.Alimentos.Remove(alimentoBuscado);
                _context.SaveChanges();
            }
        }
    }
}