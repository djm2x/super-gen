using System;
using System.Collections.Generic;
using Bogus;
using Microsoft.EntityFrameworkCore;
namespace Models
{
    public static class DataSeeding
    {
        public static string lang = "fr";

       public static ModelBuilder Roles(this ModelBuilder modelBuilder)
                    {
                    int id = 1;
                    var faker = new Faker<Role>(DataSeeding.lang)
                        .CustomInstantiator(f => new Role { Id = id++ })
.RuleFor(o => o.Name, f => f.Lorem.Word())
;
modelBuilder.Entity<Role>().HasData(faker.Generate(10));
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
.RuleFor(o => o.IdRole, f => f.Random.Number(1, 10))
;
modelBuilder.Entity<User>().HasData(faker.Generate(10));
return modelBuilder;
}


    }
}