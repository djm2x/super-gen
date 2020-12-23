
using Api.Providers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;


namespace Hubs
{
    // public interface IChatHub : IClientProxy
    // {
    //     Task ReceiveMessage(Chat msg);
    // }

    [Authorize]
    public class ChatHub : Hub //: Hub<IMessageHub>
    {

        // public async Task NewMessage(string groupName, Message msg)
        // {
        //     await Clients.Group(groupName).SendAsync("MessageReceived", msg);
        // }
        protected readonly MyContext _context;
        public ChatHub(MyContext context)
        {
            _context = context;
        }

        // public string GetConnectionId()
        // {
        //     return Context.ConnectionId;
        // }

        // public async Task NewMessage(Message msg)
        // {
        //     await Clients.Others.SendAsync("MessageReceived", msg);
        // }

        // public async Task ListConnected(string something)
        // {
        //     await Clients.All.SendAsync("ConnectedUser", ConnectedUser.ConnectedUsers);
        // }

        public async Task JoinGroupPlace(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        // public async Task<object> GetUnReadMessage3(int idReceiver)
        // {
        //     var list = await _context.Chats
        //         .Where(e => e.IdReceiver == idReceiver && e.Lu == false)
        //         .Include(e => e.Sender)
        //         .ToListAsync()
        //         ;

        //     var res = list
        //         // .Include(e => e.Sender)
        //         // .GroupBy(e => new {id = e.IdSender, username = e.Sender.UserName})
        //         .GroupBy(e => e.Sender)
        //         .Select(e => new
        //         {
        //             sender = e.Key,
        //             info = e,
        //         })
        //         // .Select(e => e.Key.UserName)
        //         .ToList()
        //         ;

        //     return res;
        // }

        public async Task<object> GetUnReadMessage2(int idReceiver)
        {
            return await _context.Users
                .Select(e => new
                {
                    // sender = e.Receivers.GroupBy(g => g.IdSender).Select(s => new
                    // {
                    //     sender = s.Key,
                    //     info = s.LastOrDefault()
                    // }),
                })
                .ToListAsync()
                ;

        }

        // public async Task<object> GetUnReadMessage(int idReceiver)
        // {
        //     return await _context.Chats
        //         .Where(e => e.IdReceiver == idReceiver && e.Lu == false)
        //         .Include(e => e.Sender)
        //         .OrderByDescending(e => e.Date)
        //         .GroupBy(e => new
        //         {
        //             idSender = e.IdSender,
        //             username = e.Sender.UserName,
        //         })
        //         .Select(e => new
        //         {
        //             idSender = e.Key.idSender,
        //             username = e.Key.username,
        //             count = e.Count(),
        //         })
        //         .ToListAsync()
        //         ;
        // }

        public override async Task OnConnectedAsync()
        {
            try
            {
                int idUser = int.Parse(Context.User?.Identity?.Name);
                // var f = Context.User?.Identity;
                var idPlace = int.Parse(Context.User.Claims.SingleOrDefault(e => e.Type == "idPlace")?.Value);
                //  int idPlace = Context.GetPlaceUser();
                // ConnectedUser.ConnectedUsers.Add(idUser, new UserPlace { IdConnection = Context.ConnectionId, IdPlace = idPlace });
                ConnectedUser.ConnectedUsers2.Add(Context.ConnectionId,
                    new UserPlace { IdConnection = Context.ConnectionId, IdUser = idUser, IdPlace = idPlace });


                // await Task.Delay(2000);
                await base.OnConnectedAsync();

                await Groups.AddToGroupAsync(Context.ConnectionId, idPlace + "");

                await Clients.Group(idPlace + "").SendAsync("toGroup", ConnectedUser.ConnectedUsers2.Values.Where(e => e.IdPlace == idPlace));

                // await Clients.All.SendAsync("ConnectedUser", ConnectedUser.List());
                // await Clients.Client(Context.ConnectionId).SendAsync("Notification", await GetUnReadMessage(idUser));

            }
            catch (System.Exception e)
            {
                await Clients.All.SendAsync("InnerException", e.Message);
            }
            // await Clients.Client(Context.ConnectionId).SendAsync("ConnectedUser", ConnectedUser.List());
        }


        public override async Task OnDisconnectedAsync(Exception exception)
        {
            try
            {
                // int idUser = int.Parse(Context.User?.Identity?.Name);

                // ConnectedUser.ConnectedUsers.Remove(idUser);
                ConnectedUser.ConnectedUsers2.Remove(Context.ConnectionId);


                var idPlace = int.Parse(Context.User.Claims.SingleOrDefault(e => e.Type == "idPlace")?.Value);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, idPlace + "");

                await Clients.Group(idPlace + "").SendAsync("toGroup", ConnectedUser.ConnectedUsers2.Values.Where(e => e.IdPlace == idPlace));


                await base.OnDisconnectedAsync(exception);

                // await Clients.All.SendAsync("ConnectedUser", ConnectedUser.List());

            }
            catch (System.Exception e)
            {
                await Clients.All.SendAsync("InnerException", e.InnerException);
            }
        }
    }

    // public class MyEqualityComparer : IEqualityComparer<Chat>
    // {
    //     public bool Equals([AllowNull] Chat x, [AllowNull] Chat y)
    //     {
    //         return x.IdSender == y.IdSender;
    //     }

    //     public int GetHashCode([DisallowNull] Chat obj)
    //     {
    //         return obj.IdSender.GetHashCode();
    //     }
    // }

    public static class ConnectedUser
    {
        // public static Dictionary<int, UserPlace> ConnectedUsers = new Dictionary<int, UserPlace>();
        public static Dictionary<string, UserPlace> ConnectedUsers2 = new Dictionary<string, UserPlace>();

        public static IEnumerable List()
        {
            // return ConnectedUser.ConnectedUsers.Select(u => new
            // {
            //     id = u.Key,
            //     idConnection = u.Value.IdConnection,
            //     idPlace = u.Value.IdPlace
            // });

            // var l = new ArrayList();

            // ConnectedUser.ConnectedUsers.ToList().ForEach(e => 
            // {
            //     if (e.Value != null)
            //     {
            //         l.Add(new { id = e.Key, idConnection = e.Value.IdConnection, idPlace = e.Value.IdPlace });
            //     }
            // });

            var l2 = new ArrayList();

            ConnectedUser.ConnectedUsers2.ToList().ForEach(e =>
            {
                if (e.Value != null)
                {
                    l2.Add(new { idConnection = e.Key, id = e.Value.IdUser, idPlace = e.Value.IdPlace });
                }
            });

            return l2;
        }
    }

    public class UserPlace
    {
        public string IdConnection { get; set; }
        public int IdUser { get; set; }
        public int IdPlace { get; set; }
    }
}