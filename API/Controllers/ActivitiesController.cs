using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Activities;

namespace API.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        public IMediator _Mediator { get; set; }
        public ActivitiesController(IMediator mediator)
        {
            _Mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await _Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await _Mediator.Send(new Details.Query{Id = id});
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> Create (Create.Command command)
        {
            return await _Mediator.Send(command);

        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit (Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _Mediator.Send(command);

        }
         [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete (Guid id)
        {
            return await _Mediator.Send(new Delete.Command{ID = id});
        }
    }
}