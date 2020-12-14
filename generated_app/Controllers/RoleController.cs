using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Api.Providers;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RolesController : SuperController<Role>
    {
        public RolesController(MyContext context ) : base(context)
        { }

        [HttpGet("{startIndex}/{pageSize}/{sortBy}/{sortDir}/{nom}")]
        public async Task<IActionResult> GetAll(int startIndex, int pageSize, string sortBy, string sortDir, string nom)
        {
            var q = _context.Roles
                .Where(e => nom == "*" ? true : e.Nom.ToLower().Contains(nom.ToLower()))

                ;

            int count = await q.CountAsync();

            var list = await q.OrderByName<Role>(sortBy, sortDir == "desc")
                .Skip(startIndex)
                .Take(pageSize)
                
                .Select(e => new 
{
id = e.Id,
nom = e.Nom,

})
                .ToListAsync()
                ;

            return Ok(new { list = list, count = count });
        }
    }
}