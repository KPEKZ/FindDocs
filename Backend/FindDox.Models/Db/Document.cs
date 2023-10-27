using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FindDox.Models.Db;

public class Document
{
	[Key]
	[DatabaseGenerated(DatabaseGeneratedOption.None)]
	public Guid Id { get; init; } = Guid.NewGuid();

	public string Name { get; set; }
	public string Number { get; set; }

	public DateTimeOffset ReleaseDate { get; set; }
	public DateTimeOffset TakeEffectDate { get; set; }

	public Guid DocumentTypeId { get; set; }

	[ForeignKey(nameof(DocumentTypeId))]
	public DocumentType DocumentType { get; set; }

	[InverseProperty(nameof(Keyword.Document))]
	public ICollection<Keyword> Keywords { get; set; }

	[InverseProperty(nameof(Link.Document))]
	public ICollection<Link> Links { get; set; }
}

