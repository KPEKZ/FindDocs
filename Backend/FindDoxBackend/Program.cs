using Microsoft.EntityFrameworkCore;
using FindDox.Abstractions.Services.DataAccess;
using FindDox.Abstractions.Services.Domain;
using FindDox.DataAccess.EF;
using FindDox.DataAccess.EF.Repositories;
using FindDox.Services.Services.Document;
using FindDox.Services.Services.DocumentType;
using FindDox.Services.Services.Keyword;
using FindDox.Services.Services.Link;
using FindDox.Abstractions.DataAccess;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddScoped<IDocumentService, DocumentService>();
builder.Services.AddScoped<IDocumentTypeService, DocumentTypeService>();
builder.Services.AddScoped<IKeywordService, KeywordService>();
builder.Services.AddScoped<ILinkService, LinkService>();
builder.Services.AddScoped<IDocumentRepository, DocumentRepository>();
builder.Services.AddScoped<IDocumentTypeRepository, DocumentTypeRepository>();
builder.Services.AddScoped<IKeywordRepository, KeywordRepository>();
builder.Services.AddScoped<ILinkRepository, LinkRepository>();
builder.Services.AddScoped<IFindBoxDbContext, FindDoxDbContext>();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                 builder =>
                 {
                     builder.WithOrigins("http://localhost:4200/",
                                         "http://localhost/",
                                         "https://localhost:7222");
                 });
});
builder.Services.AddControllers();
builder.Services.AddRazorPages();

var config = new ConfigurationBuilder()
                 .SetBasePath(Directory.GetCurrentDirectory())
                 .AddJsonFile("appsettings.json")
                 .Build();

builder.Services.AddDbContext<FindDoxDbContext>(options =>
            options.UseSqlServer(config.GetSection("ConnectionString").Value));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action}");
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.UseCors(MyAllowSpecificOrigins);
app.UseRouting();

app.MapRazorPages();

app.Run();
