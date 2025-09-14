using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace persistance;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)                       //DbContext = EF Core’s base class that knows how to talk to the database.
{
   public required DbSet<Activity> Activities { get; set; }
}
// DbContextOptions comes from AddDbContext in Program.cs.
// You pass it into AppDbContext so EF Core knows which database and how to connect.