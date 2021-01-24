using System;
using System.Collections.Generic;
using Bogus;
using Microsoft.EntityFrameworkCore;
namespace Models
{
    public static class DataSeeding
    {
        public static string lang = "fr";

       public static ModelBuilder FormatEmballages(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<FormatEmballage>(DataSeeding.lang)
                        .CustomInstantiator(f => new FormatEmballage { Id = id++ })
.RuleFor(o => o.Nom, f => f.Lorem.Word())
.RuleFor(o => o.Valeur, f => f.Random.Number(1, 10))
;
modelBuilder.Entity<FormatEmballage>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Fournisseurs(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<Fournisseur>(DataSeeding.lang)
                        .CustomInstantiator(f => new Fournisseur { Id = id++ })
.RuleFor(o => o.Nom, f => f.Lorem.Word())
.RuleFor(o => o.Ice, f => f.Lorem.Word())
.RuleFor(o => o.Patente, f => f.Lorem.Word())
.RuleFor(o => o.Rc, f => f.Lorem.Word())
.RuleFor(o => o.Rib, f => f.Lorem.Word())
.RuleFor(o => o.Telephone, f => f.Lorem.Word())
.RuleFor(o => o.Adresse, f => f.Lorem.Word())
.RuleFor(o => o.Email, f => id - 1 == 1 ? "sa@angular.io" : f.Internet.Email())
;
modelBuilder.Entity<Fournisseur>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Constructeurs(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<Constructeur>(DataSeeding.lang)
                        .CustomInstantiator(f => new Constructeur { Id = id++ })
.RuleFor(o => o.Nom, f => f.Lorem.Word())
.RuleFor(o => o.Representant, f => f.Lorem.Word())
;
modelBuilder.Entity<Constructeur>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Fonctions(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<Fonction>(DataSeeding.lang)
                        .CustomInstantiator(f => new Fonction { Id = id++ })
.RuleFor(o => o.Nom, f => f.Lorem.Word())
.RuleFor(o => o.Decision, f => id - 1 == 1 ? true : f.Random.Bool())
.RuleFor(o => o.Responsabilite, f => id - 1 == 1 ? true : f.Random.Bool())
;
modelBuilder.Entity<Fonction>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Collaborateurs(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<Collaborateur>(DataSeeding.lang)
                        .CustomInstantiator(f => new Collaborateur { Id = id++ })
.RuleFor(o => o.Nom, f => f.Lorem.Word())
.RuleFor(o => o.Prenom, f => f.Lorem.Word())
.RuleFor(o => o.Email, f => id - 1 == 1 ? "sa@angular.io" : f.Internet.Email())
.RuleFor(o => o.Matricule, f => f.Lorem.Word())
.RuleFor(o => o.ImageUrl, f => "")
.RuleFor(o => o.Actif, f => id - 1 == 1 ? true : f.Random.Bool())
;
modelBuilder.Entity<Collaborateur>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Users(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<User>(DataSeeding.lang)
                        .CustomInstantiator(f => new User { Id = id++ })
.RuleFor(o => o.Nom, f => f.Lorem.Word())
.RuleFor(o => o.Email, f => id - 1 == 1 ? "sa@angular.io" : f.Internet.Email())
.RuleFor(o => o.Password, f => "123")
.RuleFor(o => o.IsActive, f => id - 1 == 1 ? true : f.Random.Bool())
.RuleFor(o => o.ImageUrl, f => "")
.RuleFor(o => o.Profil, f => f.Lorem.Word())
;
modelBuilder.Entity<User>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Categories(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<Categorie>(DataSeeding.lang)
                        .CustomInstantiator(f => new Categorie { Id = id++ })
.RuleFor(o => o.Nom, f => f.Lorem.Word())
.RuleFor(o => o.Poids, f => f.Random.Number(1, 10))
;
modelBuilder.Entity<Categorie>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Organismes(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<Organisme>(DataSeeding.lang)
                        .CustomInstantiator(f => new Organisme { Id = id++ })
.RuleFor(o => o.Nom, f => f.Lorem.Word())
.RuleFor(o => o.Adresse, f => f.Lorem.Word())
.RuleFor(o => o.Telephone, f => f.Lorem.Word())
.RuleFor(o => o.Email, f => id - 1 == 1 ? "sa@angular.io" : f.Internet.Email())
.RuleFor(o => o.Ice, f => f.Lorem.Word())
;
modelBuilder.Entity<Organisme>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Sites(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<Site>(DataSeeding.lang)
                        .CustomInstantiator(f => new Site { Id = id++ })
.RuleFor(o => o.IdOrganisme, f => f.Random.Number(1, 10))
.RuleFor(o => o.Adresse, f => f.Lorem.Word())
.RuleFor(o => o.Ville, f => f.Lorem.Word())
.RuleFor(o => o.Telephone, f => f.Lorem.Word())
;
modelBuilder.Entity<Site>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Entites(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<Entite>(DataSeeding.lang)
                        .CustomInstantiator(f => new Entite { Id = id++ })
.RuleFor(o => o.Nom, f => f.Lorem.Word())
.RuleFor(o => o.IdSite, f => f.Random.Number(1, 10))
.RuleFor(o => o.IdCategorie, f => f.Random.Number(1, 10))
.RuleFor(o => o.IdParent, f => id - 1 == 1 ? null : id - 2)
;
modelBuilder.Entity<Entite>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Affectations(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<Affectation>(DataSeeding.lang)
                        .CustomInstantiator(f => new Affectation { Id = id++ })
.RuleFor(o => o.IdCollaborateur, f => f.Random.Number(1, 10))
.RuleFor(o => o.IdEntite, f => f.Random.Number(1, 10))
.RuleFor(o => o.DateEffet, f => f.Date.Past())
.RuleFor(o => o.Actif, f => id - 1 == 1 ? true : f.Random.Bool())
.RuleFor(o => o.IdFonction, f => f.Random.Number(1, 10))
;
modelBuilder.Entity<Affectation>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Familles(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<Famille>(DataSeeding.lang)
                        .CustomInstantiator(f => new Famille { Id = id++ })
.RuleFor(o => o.Nom, f => f.Lorem.Word())
.RuleFor(o => o.ComptagePar, f => f.Lorem.Word())
.RuleFor(o => o.IdParent, f => id - 1 == 1 ? null : id - 2)
;
modelBuilder.Entity<Famille>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Articles(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<Article>(DataSeeding.lang)
                        .CustomInstantiator(f => new Article { Id = id++ })
.RuleFor(o => o.IdFamille, f => f.Random.Number(1, 10))
.RuleFor(o => o.IdConstructeur, f => f.Random.Number(1, 10))
.RuleFor(o => o.Model, f => f.Lorem.Word())
.RuleFor(o => o.Reference, f => f.Lorem.Word())
.RuleFor(o => o.UniteMesure, f => f.Lorem.Word())
.RuleFor(o => o.QteEnStock, f => f.Random.Number(1, 10))
.RuleFor(o => o.TauxAmortissement, f => f.Random.Number(1, 10))
.RuleFor(o => o.CodeImmobilisation, f => f.Random.Number(1, 10))
.RuleFor(o => o.Notes, f => f.Lorem.Word())
;
modelBuilder.Entity<Article>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Receptions(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<Reception>(DataSeeding.lang)
                        .CustomInstantiator(f => new Reception { Id = id++ })
.RuleFor(o => o.IdFournisseur, f => f.Random.Number(1, 10))
.RuleFor(o => o.DateReception, f => f.Date.Past())
.RuleFor(o => o.Reference, f => f.Lorem.Word())
.RuleFor(o => o.Nature, f => f.Lorem.Word())
.RuleFor(o => o.MontantTotal, f => f.Random.Number(1, 10))
;
modelBuilder.Entity<Reception>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder DetailsReceptions(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<DetailsReception>(DataSeeding.lang)
                        .CustomInstantiator(f => new DetailsReception { Id = id++ })
.RuleFor(o => o.IdReception, f => f.Random.Number(1, 10))
.RuleFor(o => o.IdArticle, f => f.Random.Number(1, 10))
.RuleFor(o => o.IdFormatEmballage, f => f.Random.Number(1, 10))
.RuleFor(o => o.Quantite, f => f.Random.Number(1, 10))
.RuleFor(o => o.PrixUnitaireHT, f => f.Random.Number(1, 10))
.RuleFor(o => o.NumeroSerie, f => f.Lorem.Word())
.RuleFor(o => o.NumeroInventaire, f => f.Lorem.Word())
.RuleFor(o => o.DateMiseEnService, f => f.Date.Past())
.RuleFor(o => o.Notes, f => f.Lorem.Word())
.RuleFor(o => o.Statut, f => f.Lorem.Word())
.RuleFor(o => o.Mobilite, f => f.Lorem.Word())
;
modelBuilder.Entity<DetailsReception>().HasData(faker.Generate(10));
return modelBuilder;
}


    }
}