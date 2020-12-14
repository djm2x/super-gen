using Microsoft.EntityFrameworkCore.Migrations;

namespace apps.Migrations
{
    public partial class first : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nom = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nom = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    Password = table.Column<string>(type: "TEXT", nullable: true),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: true),
                    Profil = table.Column<string>(type: "TEXT", nullable: true),
                    IdRole = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Roles_IdRole",
                        column: x => x.IdRole,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Nom" },
                values: new object[] { 1, "repudiandae" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Nom" },
                values: new object[] { 2, "sint" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Nom" },
                values: new object[] { 3, "voluptatem" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Nom" },
                values: new object[] { 4, "aperiam" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Nom" },
                values: new object[] { 5, "quos" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Nom" },
                values: new object[] { 6, "dolorum" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Nom" },
                values: new object[] { 7, "et" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Nom" },
                values: new object[] { 8, "voluptate" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Nom" },
                values: new object[] { 9, "fugiat" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Nom" },
                values: new object[] { 10, "provident" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IdRole", "ImageUrl", "IsActive", "Nom", "Password", "Profil" },
                values: new object[] { 9, "Abelin.Pierre32@yahoo.fr", 1, "", true, "quia", "123", "iusto" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IdRole", "ImageUrl", "IsActive", "Nom", "Password", "Profil" },
                values: new object[] { 10, "Zephirin.Faure@hotmail.fr", 3, "", false, "et", "123", "eveniet" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IdRole", "ImageUrl", "IsActive", "Nom", "Password", "Profil" },
                values: new object[] { 3, "Alexine.Olivier68@yahoo.fr", 6, "", false, "ab", "123", "impedit" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IdRole", "ImageUrl", "IsActive", "Nom", "Password", "Profil" },
                values: new object[] { 4, "Ferdinand75@gmail.com", 6, "", true, "beatae", "123", "doloremque" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IdRole", "ImageUrl", "IsActive", "Nom", "Password", "Profil" },
                values: new object[] { 5, "Ambroise45@gmail.com", 6, "", true, "voluptas", "123", "quia" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IdRole", "ImageUrl", "IsActive", "Nom", "Password", "Profil" },
                values: new object[] { 6, "Yolande_Fournier73@yahoo.fr", 6, "", false, "dolores", "123", "labore" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IdRole", "ImageUrl", "IsActive", "Nom", "Password", "Profil" },
                values: new object[] { 7, "Salome19@hotmail.fr", 6, "", false, "voluptas", "123", "est" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IdRole", "ImageUrl", "IsActive", "Nom", "Password", "Profil" },
                values: new object[] { 1, "dj-m2x@hotmail.com", 7, "", true, "voluptatem", "123", "error" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IdRole", "ImageUrl", "IsActive", "Nom", "Password", "Profil" },
                values: new object[] { 2, "Elsa_Lacroix32@hotmail.fr", 7, "", true, "ut", "123", "vel" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IdRole", "ImageUrl", "IsActive", "Nom", "Password", "Profil" },
                values: new object[] { 8, "Brice_Rousseau@yahoo.fr", 9, "", false, "laboriosam", "123", "saepe" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_IdRole",
                table: "Users",
                column: "IdRole");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
