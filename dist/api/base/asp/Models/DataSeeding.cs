using System;
using System.Collections.Generic;
using Bogus;
using Microsoft.EntityFrameworkCore;
namespace Models
{
    public static class DataSeeding
    {
        public static string lang = "fr";

       public static ModelBuilder Categorys(this ModelBuilder modelBuilder)
                        {
                        int id = 1;
                        var faker = new Faker<Category>(DataSeeding.lang)
                            .CustomInstantiator(f => new Category { Id = id++ })
.RuleFor(o => o.Name, f => f.Lorem.Word())
;
modelBuilder.Entity<Category>().HasData(faker.Generate(10));
return modelBuilder;
}

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
.RuleFor(o => o.Name, f => f.Lorem.Word())
.RuleFor(o => o.Email, f => f.Internet.Email())
.RuleFor(o => o.Password, f => f.Lorem.Word())
.RuleFor(o => o.Date, f => f.Date.Past())
.RuleFor(o => o.IsActive, f => f.Random.Bool())
.RuleFor(o => o.IdRole, f => f.Random.Number(1, 10))
;
modelBuilder.Entity<User>().HasData(faker.Generate(10));
return modelBuilder;
}

public static ModelBuilder Blogs(this ModelBuilder modelBuilder)
                        {
                        int id = 1;
                        var faker = new Faker<Blog>(DataSeeding.lang)
                            .CustomInstantiator(f => new Blog { Id = id++ })
.RuleFor(o => o.Title, f => f.Lorem.Word())
.RuleFor(o => o.Description, f => f.Lorem.Word())
.RuleFor(o => o.ImageUrl, f => "")
.RuleFor(o => o.Date, f => f.Date.Past())
.RuleFor(o => o.IdUser, f => f.Random.Number(1, 10))
.RuleFor(o => o.IdCategory, f => f.Random.Number(1, 10))
;
modelBuilder.Entity<Blog>().HasData(faker.Generate(10));
return modelBuilder;
}


    }
}