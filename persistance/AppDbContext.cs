using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace persistance;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
   public required DbSet<Activity> Activities { get; set; }
}
// DbContextOptions comes from AddDbContext in Program.cs.
// You pass it into AppDbContext so EF Core knows which database and how to connect.