using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
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
    [JsonIgnore]
    public virtual ICollection<Alimento> Alimentos { get; set; } = new List<Alimento>();
}
