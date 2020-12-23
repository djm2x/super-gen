using Microsoft.EntityFrameworkCore;

namespace Models
{
    public partial class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }

        public virtual DbSet<User> Users { get; set; } 
public virtual DbSet<Role> Roles { get; set; } 
public virtual DbSet<Blog> Blogs { get; set; } 
public virtual DbSet<Category> Categorys { get; set; } 


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Name);
entity.HasIndex(e => e.Email).IsUnique();
entity.Property(e => e.Password);
entity.Property(e => e.Date);
entity.Property(e => e.IsActive);
entity.Property(e => e.IdRole);
entity.HasOne(d => d.Role).WithMany(p => p.Users).HasForeignKey(d => d.IdRole);
entity.HasMany(d => d.Blogs).WithOne(p => p.User).HasForeignKey(d => d.IdUser).OnDelete(DeleteBehavior.NoAction);
});

modelBuilder.Entity<Role>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Name);
entity.HasMany(d => d.Users).WithOne(p => p.Role).HasForeignKey(d => d.IdRole).OnDelete(DeleteBehavior.NoAction);
});

modelBuilder.Entity<Blog>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Title);
entity.Property(e => e.Description);
entity.Property(e => e.ImageUrl);
entity.Property(e => e.Date);
entity.Property(e => e.IdUser);
entity.Property(e => e.IdCategory);
entity.HasOne(d => d.User).WithMany(p => p.Blogs).HasForeignKey(d => d.IdUser);
entity.HasOne(d => d.Category).WithMany(p => p.Blogs).HasForeignKey(d => d.IdCategory);
});

modelBuilder.Entity<Category>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Name);
entity.HasMany(d => d.Blogs).WithOne(p => p.Category).HasForeignKey(d => d.IdCategory).OnDelete(DeleteBehavior.NoAction);
});




            modelBuilder
                .Categorys()
.Roles()
.Users()
.Blogs()

                ;
        }


        // partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
