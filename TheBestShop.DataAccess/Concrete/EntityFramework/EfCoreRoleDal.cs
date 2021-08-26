using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.DataAccess.EntityFramework;
using TheBestShop.Core.Entities.Concrete;
using TheBestShop.DataAccess.Abstract;

namespace TheBestShop.DataAccess.Concrete.EntityFramework
{
    public class EfCoreRoleDal : EfRepositoryBase<OperationClaim, TheBestShopContext>, IRoleDal
    {
    }
}
