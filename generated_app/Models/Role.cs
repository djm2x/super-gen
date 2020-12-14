using System;
using System.Collections.Generic;
namespace Models
{
public partial class Role 
{public int Id { get; set; }
public string Nom { get; set; }
public virtual ICollection<User> Users { get; set; }
}
}
