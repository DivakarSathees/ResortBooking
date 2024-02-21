using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace dotnetapp.Models
{
    public class User

    {
        [Key]
        public long UserId { get; set; }//n

        public string Email { get; set; }

        public string Password { get; set; }

        public string Username { get; set; }//n

        public string MobileNumber { get; set; }//n

        public string UserRole { get; set; }//n
        
    }
}
