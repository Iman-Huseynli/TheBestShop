using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheBestShop.Core.Entities.Concrete
{
    public class UserOperationClaim
    {
        public User User { get; set; }
        public int UserId { get; set; }
        public OperationClaim OperationClaim { get; set; }
        public int OperationClaimsId { get; set; }
    }
}
