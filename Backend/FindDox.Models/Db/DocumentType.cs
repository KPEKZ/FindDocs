using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FindDox.Models.Db;

public class DocumentType
{
	[Key]
	[DatabaseGenerated(DatabaseGeneratedOption.None)]
	public Guid Id { get; init; } = Guid.NewGuid();

	public string Name { get; set; }
}

