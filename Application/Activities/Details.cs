using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Net;
using Application.Errors;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivityDto>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, ActivityDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.Include(x => x.UserActivities).ThenInclude(x => x.AppUser).SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null) throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found" });

                var activityToReturn = _mapper.Map<Activity, ActivityDto>(activity); //type we wanna map from(Activity) and to (ActivityDto) and the object that we want to actually map (activity)

                return activityToReturn;
            }
        }
    }
}