using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using persistance;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<Activity>> { }

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Activity>>
    {
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Activities
                .AsNoTracking()
                .OrderBy(a => a.Date)
                .ToListAsync(cancellationToken);
        }
    }
}




