using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanningPokerAPI.Migrations
{
    /// <inheritdoc />
    public partial class RoomCardConfig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RoomConfigTable",
                columns: table => new
                {
                    ConfigRoom = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomConfigTable", x => x.ConfigRoom);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoomConfigTable");
        }
    }
}
