using FindDox.Models.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace FindDox.Abstractions.DataAccess;

public interface IFindBoxDbContext
{
	EntityEntry Entry(object item);
	EntityEntry Attach(object item);
	EntityEntry Add(object item);
	EntityEntry Update(object item);
	EntityEntry Remove(object item);
	Task<int> SaveChangesAsync(CancellationToken ctx = default);

	DbSet<Document> Documents { get; set; }
	DbSet<DocumentType> DocumentTypes { get; set; }
	DbSet<Keyword> Keywords { get; set; }
	DbSet<Link> Links { get; set; }
	DbSet<User> Users { get; set; }
	DbSet<Role> Roles { get; set; }
	DbSet<UserRole> UsersToRoles { get; set; }
	DbSet<KeywordDocument> KeywordDocument { get; set; }
}
