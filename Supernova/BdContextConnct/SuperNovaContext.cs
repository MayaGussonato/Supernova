using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Supernova.Models;

namespace Supernova.BdContextConnct;

public partial class SuperNovaContext : DbContext
{
    public SuperNovaContext()
    {
    }

    public SuperNovaContext(DbContextOptions<SuperNovaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Alimento> Alimentos { get; set; }

    public virtual DbSet<TipoAlimento> TipoAlimentos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=SuperNova;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Alimento>(entity =>
        {
            entity.HasKey(e => e.IdAlimento).HasName("PK__Alimento__240657053DC60F4B");

            entity.Property(e => e.IdAlimento).HasDefaultValueSql("(newid())");

            entity.HasOne(d => d.IdTipoAlimentoNavigation).WithMany(p => p.Alimentos).HasConstraintName("FK__Alimento__IdTipo__656C112C");
        });

        modelBuilder.Entity<TipoAlimento>(entity =>
        {
            entity.HasKey(e => e.IdTipoAlimento).HasName("PK__TipoAlim__AD5047518EFC1417");

            entity.Property(e => e.IdTipoAlimento).HasDefaultValueSql("(newid())");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__5B65BF97ACB8E7C8");

            entity.Property(e => e.IdUsuario).HasDefaultValueSql("(newid())");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
