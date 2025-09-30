using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using persistance;


namespace Application.Activities.Queries;

    // Step 1: Define the Query
    public class GetActivityDetails
{
    // This is the request object (what input we need)
    public class Query : IRequest<Activity>
    {
        public required string Id { get; set; }   // e.g. /api/activities/{id}
    }
        
        public class Handler(AppDbContext context) : IRequestHandler<Query, Activity>  //Handler class implements IRequestHandler interface from MediatR
        {
            // Step 2: Handle the Query
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                // Fetch the activity details from the database using Entity Framework Core
                var activity = await context.Activities.FindAsync([request.Id], cancellationToken);

                if(activity == null)
                {
                    throw new Exception("Activity not found");
                }
                
                return activity;
            }
        }
    }
