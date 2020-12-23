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
    public class BlogsController : SuperController<Blog>
    {
        public BlogsController(MyContext context ) : base(context)
        { }

        [HttpGet("{startIndex}/{pageSize}/{sortBy}/{sortDir}/{title}/{idUser}/{idCategory}")]
        public async Task<IActionResult> GetAll(int startIndex, int pageSize, string sortBy, string sortDir , string title, int idUser, int idCategory)
        {
            var q = _context.Blogs
                .Where(e => title == "*" ? true : e.Title.ToLower().Contains(title.ToLower()))
.Where(e => idUser == 0 ? true : e.IdUser == idUser)
.Where(e => idCategory == 0 ? true : e.IdCategory == idCategory)

                ;

            int count = await q.CountAsync();

            var list = await q.OrderByName<Blog>(sortBy, sortDir == "desc")
                .Skip(startIndex)
                .Take(pageSize)
                .Include(e => e.User).Include(e => e.Category)
                .ToListAsync()
                ;

            return Ok(new { list = list, count = count });
        }

    }
}