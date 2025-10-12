using Microsoft.AspNetCore.Mvc;
using Domain;
using persistance;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ActivitiesController(AppDbContext Context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Context.Activities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityDetail(string id)
        {
            var activity = await Context.Activities.FindAsync(id);
            if (activity == null) return NotFound();
            return activity;
        }

        [HttpPost]
        public async Task<ActionResult<Activity>> CreateActivity(Activity activity)
        {
            if (string.IsNullOrEmpty(activity.Id))
            {
                activity.Id = System.Guid.NewGuid().ToString();
            }
            Context.Activities.Add(activity);
            await Context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetActivityDetail), new { id = activity.Id }, activity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(string id, Activity updatedActivity)
        {
            var existingActivity = await Context.Activities.FindAsync(id);
            if (existingActivity == null) return NotFound();

            // Update all fields
            existingActivity.Title = updatedActivity.Title;
            existingActivity.Description = updatedActivity.Description;
            existingActivity.Category = updatedActivity.Category;
            existingActivity.Date = updatedActivity.Date;
            existingActivity.IsCanceld = updatedActivity.IsCanceld;
            existingActivity.City = updatedActivity.City;
            existingActivity.Venue = updatedActivity.Venue;
            existingActivity.Latitude = updatedActivity.Latitude;
            existingActivity.Longitude = updatedActivity.Longitude;

            await Context.SaveChangesAsync();
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(string id)
        {
            var activity = await Context.Activities.FindAsync(id);
            if (activity == null) return NotFound();

            Context.Activities.Remove(activity);
            await Context.SaveChangesAsync();

            return NoContent();
        }
        
    }
}
