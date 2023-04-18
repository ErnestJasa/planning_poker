using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanningPokerAPI.Migrations
{
    /// <inheritdoc />
    public partial class RoomCardClear : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RoomCardClearTable",
                columns: table => new
                {
                    ClearRoom = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoomClear = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomCardClearTable", x => x.ClearRoom);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoomCardClearTable");
        }
    }
}
