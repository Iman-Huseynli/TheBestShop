using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.DataAccess;
using TheBestShop.Entity.Concrete;

namespace TheBestShop.DataAccess.Abstract
{
    public interface ICartDal : IEntityRepository<Cart>
    {
    }
}
