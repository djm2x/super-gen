using System;
using System.Collections.Generic;
namespace Models
{
public partial class User 
{public int Id { get; set; }
public string Name { get; set; }
public string Email { get; set; }
public string Password { get; set; }
public DateTime Date { get; set; }
public bool IsActive { get; set; }
public int IdRole { get; set; }
public virtual Role Role { get; set; }
public virtual ICollection<Blog> Blogs { get; set; }
}
}
