using AutoMapper;
using Domain;
//namespace Application.Activities
//{
//     public class MappingProfile : Profile
//     {
//         public MappingProfile()
//         {
//             CreateMap<Activity, ActivityDto>(); //from object and to object
//             CreateMap<UserActivity, AttendeeDto>() //this is ToString map the ICollection thats in the ActivityDto ;)
//             .ForMember(destination => destination.UserName, options => options.MapFrom(source => source.AppUser.UserName)) //additional configuration for CreateMap<UserActivity, AttendeeDto>() for UserName
//             .ForMember(displayname => displayname.DisplayName, option => option.MapFrom(souece => souece.AppUser.DisplayName)); //additional configuration for CreateMap<UserActivity, AttendeeDto>() for DisplayName

//         }
//     }
// }
namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}