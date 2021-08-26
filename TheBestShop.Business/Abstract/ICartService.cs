using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Utilities.Results;
using TheBestShop.Entity.Concrete;

namespace TheBestShop.Business.Abstract
{
    public interface ICartService
    {
        IResult Add(Cart entity);
        IDataResult<Cart> FindByUserId(int id);
    }
}
