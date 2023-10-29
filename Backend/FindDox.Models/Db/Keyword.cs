using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FindDox.Models.Db;

public class Keyword
{
	[Key]
	[DatabaseGenerated(DatabaseGeneratedOption.None)]
	public Guid Id { get; init; } = Guid.NewGuid();

	[InverseProperty(nameof(KeywordDocument.Keyword))]
	public ICollection<KeywordDocument> KeywordDocuments { get; set; }

	public string Name { get; set; }
}
