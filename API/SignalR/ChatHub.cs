using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            // After the comment is saved in the DB,
            // send it to everyone, who is connected to the hub(group)
            var comment = await _mediator.Send(command);

            await Clients.Group(command.EventId.ToString())
                .SendAsync("RecieveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            // Get the Event Id from the query string
            var httpContext = Context.GetHttpContext();
            var eventId = httpContext.Request.Query["eventId"];

            // When a client connects to a hub, add him to a group with the name of the eventId
            await Groups.AddToGroupAsync(Context.ConnectionId, eventId);

            var result = await _mediator.Send(new List.Query { EventId = Guid.Parse(eventId) });

            // Send the list of comments to the user making the request to connect to the hub
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}