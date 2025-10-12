using Microsoft.EntityFrameworkCore;
using persistance;
using MediatR;
using Application.Activities.Queries;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();  //to allow cross origin requests from the client application   ,,CORS = Cross-Origin Resource Sharing. By default, your browser blocks API calls if the frontend and backend run on different domains/ports.
// MediatR registrations
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(GetActivityDetails).Assembly);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://localhost:3000", "http://localhost:5173", "https://localhost:5173"));

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
    // Use a single logger for startup cleanup and seeding
    var logger = services.GetRequiredService<ILogger<Program>>();

    // Remove any rows with empty Id using raw SQL to avoid PK modification issues
    try
    {
        var deleted = await context.Database.ExecuteSqlRawAsync("DELETE FROM \"Activities\" WHERE \"Id\" = '';");
        if (deleted > 0)
        {
            logger.LogInformation("Deleted {Count} Activities rows with empty Id.", deleted);
        }
    }
    catch (Exception ex)
    {
        logger.LogWarning(ex, "Failed to run raw SQL cleanup for empty Ids.");
    }

    await DbInitializer.SeedData(context);   //DbInitializer is static cause we dont need to create the instance to use its fun seedData

    // Clean up any activities that have an empty or null Id (fix malformed seed or manual inserts)
    var brokenActivities = context.Activities.Where(a => string.IsNullOrEmpty(a.Id)).ToList();
    if (brokenActivities.Any())
    {
        // EF Core doesn't allow changing primary key values on tracked entities.
        // Instead delete the broken rows and re-insert copies with new GUID ids.
        var replacements = new List<Domain.Activity>();
        foreach (var a in brokenActivities)
        {
            replacements.Add(new Domain.Activity {
                Id = System.Guid.NewGuid().ToString(),
                Title = a.Title,
                Date = a.Date,
                Description = a.Description,
                Category = a.Category,
                IsCanceld = a.IsCanceld,
                City = a.City,
                Venue = a.Venue,
                Latitude = a.Latitude,
                Longitude = a.Longitude
            });
            context.Activities.Remove(a);
        }
        context.Activities.AddRange(replacements);
        await context.SaveChangesAsync();
        logger.LogInformation("Replaced {Count} broken activities with new ids.", replacements.Count);
    }
}
catch(Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}
app.Run();
