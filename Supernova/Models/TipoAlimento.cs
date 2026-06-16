using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Supernova.Models;

[Table("TipoAlimento")]
public partial class TipoAlimento
{
    [Key]
    public Guid IdTipoAlimento { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Nome { get; set; } = null!;

    [InverseProperty("IdTipoAlimentoNavigation")]
    public virtual ICollection<Alimento> Alimentos { get; set; } = new List<Alimento>();
}
