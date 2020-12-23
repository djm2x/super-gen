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
    public class CategorysController : SuperController<Category>
    {
        public CategorysController(MyContext context ) : base(context)
        { }

        [HttpGet("{startIndex}/{pageSize}/{sortBy}/{sortDir}/{name}")]
        public async Task<IActionResult> GetAll(int startIndex, int pageSize, string sortBy, string sortDir , string name)
        {
            var q = _context.Categorys
                .Where(e => name == "*" ? true : e.Name.ToLower().Contains(name.ToLower()))

                ;

            int count = await q.CountAsync();

            var list = await q.OrderByName<Category>(sortBy, sortDir == "desc")
                .Skip(startIndex)
                .Take(pageSize)
                
                .ToListAsync()
                ;

            return Ok(new { list = list, count = count });
        }

    }
}