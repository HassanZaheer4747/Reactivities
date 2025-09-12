using System;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using persistance;
using Domain;

namespace API.Controllers;

// BaseApiController inherits from ControllerBase
// All other API controllers will inherit from BaseApiController
// Avoid duplication – You don’t need to repeat [ApiController], [Route], and : ControllerBase in every controller.
// Makes code consistent and easier to maintain,cleaner
public class ActivitiesController(AppDbContext context) : BaseApiController                       //(AppDbContext context) :primary constructor new approch could use to remove bit of bioler plate code if we only need to pass one constructor
{
    [HttpGet]
   public async Task<ActionResult<List<Domain.Activity>>> GetActivities()
    {
       return await context.Activities.ToListAsync();
    }
    // var list = await context.Activities.ToListAsync(); // executes SQL SELECT * FROM Activities


    [HttpGet("{id}")]       //id is a placeholder
    public async Task<ActionResult<Domain.Activity>> GetActivityDetail(string id)   //id is passed to the method from the url
    {
        var activity = await context.Activities.FindAsync(id);
        if (activity == null) return NotFound();   //404
        return activity;
    }
}
