using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.DataAccess;
using TheBestShop.Core.Entities.Concrete;

namespace TheBestShop.DataAccess.Abstract
{
    public interface IUserDal : IEntityRepository<User>
    {
        List<OperationClaim> GetClaims(User user);
        bool AddUserToOperation(string operationName, int userId);
        User GetUserWithRoles(int id);
    }
}
