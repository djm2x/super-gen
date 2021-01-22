using Microsoft.EntityFrameworkCore;

namespace Models
{
    public partial class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }

        public virtual DbSet<User> Users { get; set; } 
public virtual DbSet<Role> Roles { get; set; } 


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Nom);
entity.HasIndex(e => e.Email).IsUnique();
entity.Property(e => e.Password);
entity.Property(e => e.IsActive);
entity.Property(e => e.ImageUrl);
entity.Property(e => e.Profil);
entity.Property(e => e.IdRole);
entity.HasOne(e => e.Role).WithMany(e => e.Users).HasForeignKey(e => e.IdRole);
});

modelBuilder.Entity<Role>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Name);
entity.HasMany(e => e.Users).WithOne(p => p.Role).HasForeignKey(e => e.IdRole).OnDelete(DeleteBehavior.Cascade);
});




            modelBuilder
                .Roles()
.Users()

                ;
        }


        // partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
