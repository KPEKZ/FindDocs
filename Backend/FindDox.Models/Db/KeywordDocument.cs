using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FindDox.Models.Db;

public class KeywordDocument
{
	[Key]
	[DatabaseGenerated(DatabaseGeneratedOption.None)]
	public Guid Id { get; init; } = Guid.NewGuid();


	public Guid DocumentId { get; set; }
	public Guid KeywordId { get; set; }


	[ForeignKey(nameof(DocumentId))]
	public Document Document { get; set; }

	[ForeignKey(nameof(KeywordId))]
	public Keyword Keyword { get; set; }
}
