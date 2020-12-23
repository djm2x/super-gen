using System;
using System.Collections.Generic;
namespace Models
{
public partial class Blog 
{public int Id { get; set; }
public string Title { get; set; }
public string Description { get; set; }
public string ImageUrl { get; set; }
public DateTime Date { get; set; }
public int IdUser { get; set; }
public int IdCategory { get; set; }
public virtual User User { get; set; }
public virtual Category Category { get; set; }
}
}
