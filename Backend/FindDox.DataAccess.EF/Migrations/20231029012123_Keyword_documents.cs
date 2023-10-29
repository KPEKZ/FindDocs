using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FindDox.DataAccess.EF.Migrations
{
    /// <inheritdoc />
    public partial class Keyword_documents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Keywords_Documents_DocumentId",
                table: "Keywords");

            migrationBuilder.DropIndex(
                name: "IX_Keywords_DocumentId",
                table: "Keywords");

            migrationBuilder.DropColumn(
                name: "DocumentId",
                table: "Keywords");

            migrationBuilder.CreateTable(
                name: "KeywordDocument",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DocumentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    KeywordId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KeywordDocument", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KeywordDocument_Documents_DocumentId",
                        column: x => x.DocumentId,
                        principalTable: "Documents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KeywordDocument_Keywords_KeywordId",
                        column: x => x.KeywordId,
                        principalTable: "Keywords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KeywordDocument_DocumentId",
                table: "KeywordDocument",
                column: "DocumentId");

            migrationBuilder.CreateIndex(
                name: "IX_KeywordDocument_KeywordId",
                table: "KeywordDocument",
                column: "KeywordId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KeywordDocument");

            migrationBuilder.AddColumn<Guid>(
                name: "DocumentId",
                table: "Keywords",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Keywords_DocumentId",
                table: "Keywords",
                column: "DocumentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Keywords_Documents_DocumentId",
                table: "Keywords",
                column: "DocumentId",
                principalTable: "Documents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
