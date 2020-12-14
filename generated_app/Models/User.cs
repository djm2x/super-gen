using System;
using System.Collections.Generic;
namespace Models
{
public partial class User 
{public int Id { get; set; }
public string Nom { get; set; }
public string Email { get; set; }
public string Password { get; set; }
public bool IsActive { get; set; }
public string ImageUrl { get; set; }
public string Profil { get; set; }
public int IdRole { get; set; }
public virtual Role Role { get; set; }
}
}
