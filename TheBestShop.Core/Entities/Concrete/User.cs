using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheBestShop.Core.Entities.Concrete
{
    public class User: IEntity
    {
        public User()
        {
            UserOperationClaims = new List<UserOperationClaim>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public bool Status { get; set; }
        public DateTime RegisterDate { get; set; }

        public List<UserOperationClaim> UserOperationClaims { get; set; }
    }
}
