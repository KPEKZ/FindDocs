using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FindDox.Models.Db;

public class Keyword
{
	[Key]
	[DatabaseGenerated(DatabaseGeneratedOption.None)]
	public Guid Id { get; init; } = Guid.NewGuid();

	public Guid DocumentId { get; set; }

	[ForeignKey(nameof(DocumentId))]
	public Document Document { get; set; }

	public string Name { get; set; }
}
