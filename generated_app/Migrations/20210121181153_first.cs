using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace apps.Migrations
{
    public partial class first : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Poids = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Collaborateurs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prenom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Matricule = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Actif = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Collaborateurs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Constructeurs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Representant = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Constructeurs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Familles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ComptagePar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdParent = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Familles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Familles_Familles_IdParent",
                        column: x => x.IdParent,
                        principalTable: "Familles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Fonctions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Decision = table.Column<bool>(type: "bit", nullable: false),
                    Responsabilite = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fonctions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Fournisseurs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ice = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Patente = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rib = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Telephone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Adresse = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fournisseurs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Organismes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Adresse = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Telephone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Ice = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organismes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Articles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdFamille = table.Column<int>(type: "int", nullable: false),
                    IdConstructeur = table.Column<int>(type: "int", nullable: false),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Reference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UniteMesure = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QteEnStock = table.Column<int>(type: "int", nullable: false),
                    TauxAmortissement = table.Column<int>(type: "int", nullable: false),
                    CodeImmobilisation = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Articles_Constructeurs_IdConstructeur",
                        column: x => x.IdConstructeur,
                        principalTable: "Constructeurs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Articles_Familles_IdFamille",
                        column: x => x.IdFamille,
                        principalTable: "Familles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Receptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdFournisseur = table.Column<int>(type: "int", nullable: false),
                    DateReception = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Reference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MontantTotal = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Receptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Receptions_Fournisseurs_IdFournisseur",
                        column: x => x.IdFournisseur,
                        principalTable: "Fournisseurs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Sites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdOrganisme = table.Column<int>(type: "int", nullable: false),
                    Adresse = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ville = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Telephone = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sites_Organismes_IdOrganisme",
                        column: x => x.IdOrganisme,
                        principalTable: "Organismes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DetailsRecpetions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdReception = table.Column<int>(type: "int", nullable: false),
                    IdArticle = table.Column<int>(type: "int", nullable: false),
                    Quantit = table.Column<int>(type: "int", nullable: false),
                    PrixUnitaireHT = table.Column<int>(type: "int", nullable: false),
                    NumeroSerie = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumeroInventaire = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateMiseEnService = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Statut = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mobilite = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailsRecpetions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailsRecpetions_Articles_IdArticle",
                        column: x => x.IdArticle,
                        principalTable: "Articles",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DetailsRecpetions_Receptions_IdReception",
                        column: x => x.IdReception,
                        principalTable: "Receptions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Entites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdSite = table.Column<int>(type: "int", nullable: false),
                    IdCategorie = table.Column<int>(type: "int", nullable: false),
                    IdParent = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Entites_Categories_IdCategorie",
                        column: x => x.IdCategorie,
                        principalTable: "Categories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Entites_Entites_IdParent",
                        column: x => x.IdParent,
                        principalTable: "Entites",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Entites_Sites_IdSite",
                        column: x => x.IdSite,
                        principalTable: "Sites",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Affectations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdCollaborateur = table.Column<int>(type: "int", nullable: false),
                    IdEntite = table.Column<int>(type: "int", nullable: false),
                    DateEffet = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Actif = table.Column<bool>(type: "bit", nullable: false),
                    IdFonction = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Affectations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Affectations_Collaborateurs_IdCollaborateur",
                        column: x => x.IdCollaborateur,
                        principalTable: "Collaborateurs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Affectations_Entites_IdEntite",
                        column: x => x.IdEntite,
                        principalTable: "Entites",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Affectations_Fonctions_IdFonction",
                        column: x => x.IdFonction,
                        principalTable: "Fonctions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Affectations_IdCollaborateur",
                table: "Affectations",
                column: "IdCollaborateur");

            migrationBuilder.CreateIndex(
                name: "IX_Affectations_IdEntite",
                table: "Affectations",
                column: "IdEntite");

            migrationBuilder.CreateIndex(
                name: "IX_Affectations_IdFonction",
                table: "Affectations",
                column: "IdFonction");

            migrationBuilder.CreateIndex(
                name: "IX_Articles_IdConstructeur",
                table: "Articles",
                column: "IdConstructeur");

            migrationBuilder.CreateIndex(
                name: "IX_Articles_IdFamille",
                table: "Articles",
                column: "IdFamille");

            migrationBuilder.CreateIndex(
                name: "IX_DetailsRecpetions_IdArticle",
                table: "DetailsRecpetions",
                column: "IdArticle");

            migrationBuilder.CreateIndex(
                name: "IX_DetailsRecpetions_IdReception",
                table: "DetailsRecpetions",
                column: "IdReception");

            migrationBuilder.CreateIndex(
                name: "IX_Entites_IdCategorie",
                table: "Entites",
                column: "IdCategorie");

            migrationBuilder.CreateIndex(
                name: "IX_Entites_IdParent",
                table: "Entites",
                column: "IdParent");

            migrationBuilder.CreateIndex(
                name: "IX_Entites_IdSite",
                table: "Entites",
                column: "IdSite");

            migrationBuilder.CreateIndex(
                name: "IX_Familles_IdParent",
                table: "Familles",
                column: "IdParent");

            migrationBuilder.CreateIndex(
                name: "IX_Fournisseurs_Email",
                table: "Fournisseurs",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Organismes_Email",
                table: "Organismes",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Receptions_IdFournisseur",
                table: "Receptions",
                column: "IdFournisseur");

            migrationBuilder.CreateIndex(
                name: "IX_Sites_IdOrganisme",
                table: "Sites",
                column: "IdOrganisme");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Affectations");

            migrationBuilder.DropTable(
                name: "DetailsRecpetions");

            migrationBuilder.DropTable(
                name: "Collaborateurs");

            migrationBuilder.DropTable(
                name: "Entites");

            migrationBuilder.DropTable(
                name: "Fonctions");

            migrationBuilder.DropTable(
                name: "Articles");

            migrationBuilder.DropTable(
                name: "Receptions");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Sites");

            migrationBuilder.DropTable(
                name: "Constructeurs");

            migrationBuilder.DropTable(
                name: "Familles");

            migrationBuilder.DropTable(
                name: "Fournisseurs");

            migrationBuilder.DropTable(
                name: "Organismes");
        }
    }
}
