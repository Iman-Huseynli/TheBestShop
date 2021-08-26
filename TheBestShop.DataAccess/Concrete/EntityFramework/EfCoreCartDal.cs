using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.DataAccess.EntityFramework;
using TheBestShop.DataAccess.Abstract;
using TheBestShop.Entity.Concrete;

namespace TheBestShop.DataAccess.Concrete.EntityFramework
{
    public class EfCoreCartDal : EfRepositoryBase<Cart, TheBestShopContext>, ICartDal
    {
    }
}
