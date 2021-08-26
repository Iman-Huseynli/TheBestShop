using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Business.Abstract;
using TheBestShop.Core.Utilities.Results;
using TheBestShop.DataAccess.Abstract;
using TheBestShop.Entity.Concrete;

namespace TheBestShop.Business.Concrete
{
    public class CartManager : ICartService
    {
        private ICartDal _cartDal;

        public CartManager(ICartDal cartDal)
        {
            _cartDal = cartDal;
        }

        public IResult Add(Cart entity)
        {
            _cartDal.Create(entity);
            return new SuccessResult();
        }

        public IDataResult<Cart> FindByUserId(int id)
        {
            var data = _cartDal.Get(c => c.UserId == id);
            return new SuccessDataResult<Cart>(data);
        }
    }
}
