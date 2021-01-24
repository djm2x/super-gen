using Microsoft.EntityFrameworkCore;

namespace Models
{
    public partial class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }

        public virtual DbSet<Organisme> Organismes { get; set; } 
public virtual DbSet<Site> Sites { get; set; } 
public virtual DbSet<Entite> Entites { get; set; } 
public virtual DbSet<Categorie> Categories { get; set; } 
public virtual DbSet<User> Users { get; set; } 
public virtual DbSet<Collaborateur> Collaborateurs { get; set; } 
public virtual DbSet<Fonction> Fonctions { get; set; } 
public virtual DbSet<Affectation> Affectations { get; set; } 
public virtual DbSet<Constructeur> Constructeurs { get; set; } 
public virtual DbSet<Famille> Familles { get; set; } 
public virtual DbSet<Article> Articles { get; set; } 
public virtual DbSet<Fournisseur> Fournisseurs { get; set; } 
public virtual DbSet<Reception> Receptions { get; set; } 
public virtual DbSet<DetailsReception> DetailsReceptions { get; set; } 
public virtual DbSet<FormatEmballage> FormatEmballages { get; set; } 


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Organisme>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Nom);
entity.Property(e => e.Adresse);
entity.Property(e => e.Telephone);
entity.HasIndex(e => e.Email).IsUnique();
entity.Property(e => e.Ice);
entity.HasMany(e => e.Sites).WithOne(p => p.Organisme).HasForeignKey(e => e.IdOrganisme).OnDelete(DeleteBehavior.Cascade);
});

modelBuilder.Entity<Site>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.IdOrganisme);
entity.HasOne(e => e.Organisme).WithMany(e => e.Sites).HasForeignKey(e => e.IdOrganisme);
entity.Property(e => e.Adresse);
entity.Property(e => e.Ville);
entity.Property(e => e.Telephone);
entity.HasMany(e => e.Entites).WithOne(p => p.Site).HasForeignKey(e => e.IdSite).OnDelete(DeleteBehavior.Cascade);
});

modelBuilder.Entity<Entite>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Nom);
entity.Property(e => e.IdSite);
entity.HasOne(e => e.Site).WithMany(e => e.Entites).HasForeignKey(e => e.IdSite);
entity.Property(e => e.IdCategorie);
entity.HasOne(e => e.Categorie).WithMany(e => e.Entites).HasForeignKey(e => e.IdCategorie);
entity.Property(e => e.IdParent);
entity.HasOne(e => e.Parent).WithMany(e => e.Childs).HasForeignKey(e => e.IdParent);
entity.HasMany(e => e.Childs).WithOne(p => p.Parent).HasForeignKey(e => e.IdParent).OnDelete(DeleteBehavior.Cascade);
entity.HasMany(e => e.Affectations).WithOne(p => p.Entite).HasForeignKey(e => e.IdEntite).OnDelete(DeleteBehavior.Cascade);
});

modelBuilder.Entity<Categorie>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Nom);
entity.Property(e => e.Poids);
entity.HasMany(e => e.Entites).WithOne(p => p.Categorie).HasForeignKey(e => e.IdCategorie).OnDelete(DeleteBehavior.Cascade);
});

modelBuilder.Entity<User>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Nom);
entity.HasIndex(e => e.Email).IsUnique();
entity.Property(e => e.Password);
entity.Property(e => e.IsActive);
entity.Property(e => e.ImageUrl);
entity.Property(e => e.Profil);
});

modelBuilder.Entity<Collaborateur>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Nom);
entity.Property(e => e.Prenom);
entity.HasIndex(e => e.Email).IsUnique();
entity.Property(e => e.Matricule);
entity.Property(e => e.ImageUrl);
entity.Property(e => e.Actif);
entity.HasMany(e => e.Affectations).WithOne(p => p.Collaborateur).HasForeignKey(e => e.IdCollaborateur).OnDelete(DeleteBehavior.Cascade);
});

modelBuilder.Entity<Fonction>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Nom);
entity.Property(e => e.Decision);
entity.Property(e => e.Responsabilite);
entity.HasMany(e => e.Affectations).WithOne(p => p.Fonction).HasForeignKey(e => e.IdFonction).OnDelete(DeleteBehavior.Cascade);
});

modelBuilder.Entity<Affectation>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.IdCollaborateur);
entity.HasOne(e => e.Collaborateur).WithMany(e => e.Affectations).HasForeignKey(e => e.IdCollaborateur);
entity.Property(e => e.IdEntite);
entity.HasOne(e => e.Entite).WithMany(e => e.Affectations).HasForeignKey(e => e.IdEntite);
entity.Property(e => e.DateEffet);
entity.Property(e => e.Actif);
entity.Property(e => e.IdFonction);
entity.HasOne(e => e.Fonction).WithMany(e => e.Affectations).HasForeignKey(e => e.IdFonction);
});

modelBuilder.Entity<Constructeur>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Nom);
entity.Property(e => e.Representant);
entity.HasMany(e => e.Articles).WithOne(p => p.Constructeur).HasForeignKey(e => e.IdConstructeur).OnDelete(DeleteBehavior.Cascade);
});

modelBuilder.Entity<Famille>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Nom);
entity.Property(e => e.ComptagePar);
entity.Property(e => e.IdParent);
entity.HasOne(e => e.Parent).WithMany(e => e.Childs).HasForeignKey(e => e.IdParent);
entity.HasMany(e => e.Childs).WithOne(p => p.Parent).HasForeignKey(e => e.IdParent).OnDelete(DeleteBehavior.Cascade);
entity.HasMany(e => e.Articles).WithOne(p => p.Famille).HasForeignKey(e => e.IdFamille).OnDelete(DeleteBehavior.Cascade);
});

modelBuilder.Entity<Article>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.IdFamille);
entity.HasOne(e => e.Famille).WithMany(e => e.Articles).HasForeignKey(e => e.IdFamille);
entity.Property(e => e.IdConstructeur);
entity.HasOne(e => e.Constructeur).WithMany(e => e.Articles).HasForeignKey(e => e.IdConstructeur);
entity.Property(e => e.Model);
entity.Property(e => e.Reference);
entity.Property(e => e.UniteMesure);
entity.Property(e => e.QteEnStock);
entity.Property(e => e.TauxAmortissement);
entity.Property(e => e.CodeImmobilisation);
entity.Property(e => e.Notes);
entity.HasMany(e => e.DetailsReceptions).WithOne(p => p.Article).HasForeignKey(e => e.IdArticle).OnDelete(DeleteBehavior.Cascade);
});

modelBuilder.Entity<Fournisseur>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Nom);
entity.Property(e => e.Ice);
entity.Property(e => e.Patente);
entity.Property(e => e.Rc);
entity.Property(e => e.Rib);
entity.Property(e => e.Telephone);
entity.Property(e => e.Adresse);
entity.HasIndex(e => e.Email).IsUnique();
entity.HasMany(e => e.Receptions).WithOne(p => p.Fournisseur).HasForeignKey(e => e.IdFournisseur).OnDelete(DeleteBehavior.Cascade);
});

modelBuilder.Entity<Reception>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.IdFournisseur);
entity.HasOne(e => e.Fournisseur).WithMany(e => e.Receptions).HasForeignKey(e => e.IdFournisseur);
entity.Property(e => e.DateReception);
entity.Property(e => e.Reference);
entity.Property(e => e.Nature);
entity.Property(e => e.MontantTotal);
entity.HasMany(e => e.DetailsReceptions).WithOne(p => p.Reception).HasForeignKey(e => e.IdReception).OnDelete(DeleteBehavior.Cascade);
});

modelBuilder.Entity<DetailsReception>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.IdReception);
entity.HasOne(e => e.Reception).WithMany(e => e.DetailsReceptions).HasForeignKey(e => e.IdReception);
entity.Property(e => e.IdArticle);
entity.HasOne(e => e.Article).WithMany(e => e.DetailsReceptions).HasForeignKey(e => e.IdArticle);
entity.Property(e => e.IdFormatEmballage);
entity.HasOne(e => e.FormatEmballage).WithMany(e => e.DetailsReceptions).HasForeignKey(e => e.IdFormatEmballage);
entity.Property(e => e.Quantite);
entity.Property(e => e.PrixUnitaireHT);
entity.Property(e => e.NumeroSerie);
entity.Property(e => e.NumeroInventaire);
entity.Property(e => e.DateMiseEnService);
entity.Property(e => e.Notes);
entity.Property(e => e.Statut);
entity.Property(e => e.Mobilite);
});

modelBuilder.Entity<FormatEmballage>(entity => 
{entity.HasKey(e => e.Id);
entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Property(e => e.Nom);
entity.Property(e => e.Valeur);
entity.HasMany(e => e.DetailsReceptions).WithOne(p => p.FormatEmballage).HasForeignKey(e => e.IdFormatEmballage).OnDelete(DeleteBehavior.Cascade);
});




            modelBuilder
                .FormatEmballages()
.Fournisseurs()
.Constructeurs()
.Fonctions()
.Collaborateurs()
.Users()
.Categories()
.Organismes()
.Sites()
.Entites()
.Affectations()
.Familles()
.Articles()
.Receptions()
.DetailsReceptions()

                ;
        }


        // partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
