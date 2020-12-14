﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Providers;
using System.Linq;
using Models;
using System;
using System.Linq.Expressions;
using System.Reflection;

namespace Controllers
{
    public class SuperController<T> : ControllerBase where T : class
    {
        protected readonly MyContext _context;

        public SuperController(MyContext context)
        {
            _context = context;
        }

        [HttpGet("{startIndex}/{pageSize}/{sortBy}/{sortDir}")]
        public virtual async Task<IActionResult> GetAll(int startIndex, int pageSize, string sortBy, string sortDir)
        {
            // int i = typeof(T).FullName.LastIndexOf('.');
            // string tableName = typeof(T).FullName.Substring(i + 1) + "s";

            var list = await _context.Set<T>()
                .OrderByName<T>(sortBy, sortDir == "desc")
                .Skip(startIndex)
                .Take(pageSize)
                .ToListAsync()
                ;
            int count = await _context.Set<T>().CountAsync();

            return Ok(new { list = list, count = count });
        }

        [HttpGet("{id}/{lang}")]
        public virtual async Task<ActionResult> ChangeState(int id, string lang)
        {
            T model = await _context.Set<T>().FindAsync(id);

            if (model == null)
            {
                return BadRequest("This thing doent existe");
            }

            // Type type = typeof(T);

            PropertyInfo prop = model.GetType().GetProperty("IsActive");

            // if (prop == null)
            // {
            //     prop = model.GetType().GetProperty("UserStatus");
            // }

            bool isTrue = (bool)prop.GetValue(model, null);

            prop.SetValue(model, !isTrue);
            

            try
            {
                await _context.SaveChangesAsync();

                // send email
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<int>> Count()
        {
            return await _context.Set<T>().CountAsync();
        }

        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<T>>> Get()
        {
            return await _context.Set<T>().OrderByName<T>("Id").ToListAsync();
        }



        [HttpPost]
        public virtual async Task<ActionResult<T>> Post(T model)
        {
            _context.Set<T>().Add(model);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return Ok(model);
        }

        [HttpDelete("{id}")]
        public virtual async Task<ActionResult> Delete(int id)
        {
            var model = await _context.Set<T>().FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            _context.Set<T>().Remove(model);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return Ok();
        }


        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Put([FromRoute] int id, [FromBody] T model)
        {

            _context.Entry(model).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return NoContent();
        }

        [HttpGet("{id}")]
        public virtual async Task<ActionResult<T>> Get(int id)
        {
            var model = await _context.Set<T>().FindAsync(id);

            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        [HttpGet("{column}/{name}")]
        public virtual async Task<ActionResult<IEnumerable<T>>> Autocomplete([FromRoute] string column,[FromRoute] string name)
        {
            int i = typeof(T).FullName.LastIndexOf('.');
            string tableName = typeof(T).FullName.Substring(i + 1) + "s";

            return await _context.Set<T>()
                .FromSqlRaw(String.Format(@"SELECT * FROM {0} where {1} LIKE '%{2}%'", tableName, column, name))
                .Take(10)
                .ToListAsync();
        }

        [HttpPost]
        public virtual async Task<IActionResult> UpdateRange(List<T> models)
        {
            if (models.Count == 0)
            {
                return Ok(new { message = "count = 0" });
            }

            _context.Set<T>().UpdateRange(models);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return NoContent();
        }

        [HttpPost]
        public virtual async Task<IActionResult> DeleteRange2(List<T> models)
        {
            if (models.Count == 0)
            {
                return Ok(new { message = "count = 0" });
            }

            _context.Set<T>().RemoveRange(models);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return NoContent();
        }

        // T GetInstance<T>() where T : new()
        // {
        //     T instance = new T();
        //     return instance;
        // }


        [HttpPost]
        public virtual async Task<ActionResult<T>> DeleteRange(List<int> models)
        {
            if (models.Count == 0)
            {
                return Ok(new { message = "count = 0" });
            }

            // generic List with no parameters
            // Type openType = typeof(List<>);

            // // To create a List<string>
            // Type[] tArgs = { typeof(int) };
            // Type target = openType.MakeGenericType(tArgs);

            // Create an instance - Activator.CreateInstance will call the default constructor.
            // This is equivalent to calling new List<string>().
            // List<int> result = (List<int>)Activator.CreateInstance(target);

            // models.ForEach(model => {
            //     PropertyInfo prop = model.GetType().GetProperty("Id");

            //     int id = (int)prop.GetValue(model, null);

            //     _context.Set<T>().Remove(_context.Set<T>().Find(id));

            // });

            // var l =  models.Select(model => (int)model.GetType().GetProperty("Id").GetValue(model, null)).ToList();
            var l =  models.Select(id => _context.Set<T>().Find(id)).ToList();

            _context.Set<T>().RemoveRange(l);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return NoContent();
        }


    }
}