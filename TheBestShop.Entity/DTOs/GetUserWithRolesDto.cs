using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities;
using TheBestShop.Core.Entities.Concrete;

namespace TheBestShop.Entity.DTOs
{
    public class GetUserWithRolesDto : IDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }
        public DateTime RegisterDate { get; set; }
        public List<UserOperationClaim> UserOperationClaims { get; set; }
    }
}
