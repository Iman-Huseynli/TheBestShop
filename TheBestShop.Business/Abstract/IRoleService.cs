using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities.Concrete;
using TheBestShop.Core.Utilities.Results;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.Abstract
{
    public interface IRoleService
    {
        IDataResult<List<OperationClaim>> GetAll();
        IDataResult<OperationClaim> GetById(int id);
        IDataResult<OperationClaim> GetByName(string name);
        IResult AddOrUpdateRole(int id, RoleForAdminPageDto data);
        IResult Delete(int id);
    }
}
