using Microsoft.EntityFrameworkCore;
using persistance;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapControllers();

// Resolve AppDbContext from DI container.
// Run migrations or seed the database.
// Dispose it immediately (avoid memory leaks).
// That’s exactly what CreateScope() does:
// It gives you a temporary lifetime scope.
// You can resolve AppDbContext inside it.
// After using block ends → it disposes everything properly.

// Why using var?
// Create a temporary container for my database context.”
// “Run my startup logic.”
// “Destroy the container so no resources are wasted.”
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);   //DbInitializer is static cause we dont need to create the instance to use its fun seedData
}
catch(Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}
app.Run();
