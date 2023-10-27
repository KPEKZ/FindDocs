﻿using FindDox.Abstractions.DataAccess;
using FindDox.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace FindDox.DataAccess.EF;

public class FindDoxDbContext : DbContext, IFindBoxDbContext
{
	public FindDoxDbContext(DbContextOptions<FindDoxDbContext> options) : base(options)
	{ }
	public DbSet<Document> Documents { get ; set ; }
	public DbSet<DocumentType> DocumentTypes { get; set; }
	public DbSet<Keyword> Keywords { get; set; }
	public DbSet<Link> Links { get; set; }
}
