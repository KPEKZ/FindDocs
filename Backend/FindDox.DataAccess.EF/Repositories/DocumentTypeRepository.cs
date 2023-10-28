using FindDox.Abstractions.DataAccess;
using FindDox.Abstractions.Services.DataAccess;
using FindDox.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace FindDox.DataAccess.EF.Repositories;

public class DocumentTypeRepository : IDocumentTypeRepository
{
	protected readonly IFindBoxDbContext _dbContext;

	public DocumentTypeRepository(IFindBoxDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task<DocumentType> Get(Guid id)
	{
		return await _dbContext.DocumentTypes
			.SingleOrDefaultAsync(x => x.Id.Equals(id))
			?? throw new Exception("Тип документа не найден");
	}

	public async Task<DocumentType> Add(DocumentType document)
	{
		await _dbContext.DocumentTypes.AddAsync(document);

		return document;
	}

	public Task Update(DocumentType document)
	{
		_dbContext.DocumentTypes.Update(document);

		return Task.CompletedTask;
	}

	public async Task Remove(Guid documentTypeId)
	{
		var documentType = await Get(documentTypeId);

		_dbContext.DocumentTypes.Remove(documentType);
	}

	public async Task<int> Save(CancellationToken ctx = default)
	{
		return await _dbContext.SaveChangesAsync(ctx);
	}
}
