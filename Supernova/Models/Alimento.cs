using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Supernova.Models;

[Table("Alimento")]
public partial class Alimento
{
    [Key]
    public Guid IdAlimento { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Nome { get; set; } = null!;

    [Column(TypeName = "text")]
    public string Descricao { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string? Imagem { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Preco { get; set; }

    public Guid? IdTipoAlimento { get; set; }

    [ForeignKey("IdTipoAlimento")]
    [InverseProperty("Alimentos")]
    public virtual TipoAlimento? IdTipoAlimentoNavigation { get; set; }
}
