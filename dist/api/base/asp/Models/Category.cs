using System;
using System.Collections.Generic;
namespace Models
{
public partial class Category 
{public int Id { get; set; }
public string Name { get; set; }
public virtual ICollection<Blog> Blogs { get; set; }
}
}
