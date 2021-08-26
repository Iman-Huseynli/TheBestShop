using Microsoft.EntityFrameworkCore.Migrations;

namespace TheBestShop.DataAccess.Migrations
{
    public partial class useroperation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserOperationClaims");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UserOperationClaims",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
