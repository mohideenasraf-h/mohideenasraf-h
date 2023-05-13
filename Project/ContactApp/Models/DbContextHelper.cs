using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ContactApp.Models
{
    public partial class DbContextHelper : DbContext
    {
        public DbContextHelper()
        {
        }

        public DbContextHelper(DbContextOptions<DbContextHelper> options)
            : base(options)
        {
        }

        public virtual DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.ToTable("Contact");

                entity.Property(e => e.ContactId).HasColumnName("contact_id");

                entity.Property(e => e.Address)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .HasMaxLength(75)
                    .IsUnicode(false);

                entity.Property(e => e.Country)
                    .HasMaxLength(75)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(75)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(75)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PostalCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.RecordStatus)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.State)
                    .HasMaxLength(75)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
