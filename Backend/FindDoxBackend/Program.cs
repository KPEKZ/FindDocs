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

// Add services to the container.
builder.Services.AddScoped<IDocumentService, DocumentService>();
builder.Services.AddScoped<IDocumentTypeService, DocumentTypeService>();
builder.Services.AddScoped<IKeywordService, KeywordService>();
builder.Services.AddScoped<ILinkService, LinkService>();
builder.Services.AddScoped<IDocumentRepository, DocumentRepository>();
builder.Services.AddScoped<IDocumentTypeRepository, DocumentTypeRepository>();
builder.Services.AddScoped<IKeywordRepository, KeywordRepository>();
builder.Services.AddScoped<ILinkRepository, LinkRepository>();
builder.Services.AddScoped<IFindBoxDbContext, FindDoxDbContext>();
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddRazorPages();
builder.Services.AddDbContext<FindDoxDbContext>(options =>
            options.UseSqlServer("DefaultConnection"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action}");
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();

app.UseRouting();

app.MapRazorPages();

app.Run();

//public class Program
//{
//    public static void Main(string[] args)
//    {
//        BuildWebHost(args).Run();
//    }
//    public static IWebHost BuildWebHost(string[] args) => WebHost.CreateDefaultBuilder(args).UseStartup<Startup>().Build();
//}

//public class Startup
//{
//    public Startup(IConfiguration configuration)
//    {
//        Configuration = configuration;
//    }

//    public IConfiguration Configuration { get; }

//    // This method gets called by the runtime. Use this method to add services to the container.
//    public void ConfigureServices(IServiceCollection services)
//    {
//        services.AddDbContext<FindDoxDbContext>(options =>
//            options.UseSqlServer(
//                Configuration.GetConnectionString("DefaultConnection")));


//        services.AddScoped<IDocumentService, DocumentService>();
//        services.AddScoped<IDocumentTypeService, DocumentTypeService>();
//        services.AddScoped<IKeywordService, KeywordService>();
//        services.AddScoped<ILinkService, LinkService>();
//        services.AddScoped<IDocumentRepository, DocumentRepository>();
//        services.AddScoped<IDocumentTypeRepository, DocumentTypeRepository>();
//        services.AddScoped<IKeywordRepository, KeywordRepository>();
//        services.AddScoped<ILinkRepository, LinkRepository>();
//        services.AddCors();
//        services.AddControllers();
//    }

//    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
//    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//    {
//        if (env.IsDevelopment())
//        {
//            app.UseDeveloperExceptionPage();
//        }
//        else
//        {
//            app.UseExceptionHandler("/Home/Error");
//            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//            app.UseHsts();
//        }
//        app.UseHttpsRedirection();
//        app.UseStaticFiles();
//        app.UseRouting();
//        //app.UseSession();

//        //app.UseAuthentication();
//        //app.UseAuthorization();

//        app.UseEndpoints(endpoints =>
//        {
//            endpoints.MapControllers();
//        });
//    }
//}
