using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Utilities.Results;
using TheBestShop.Entity.Concrete;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.Abstract
{
    public interface ICartItemService
    {
        IDataResult<List<CartItem>> AddToCart(List<CartItemDto> carts, int userId);
        IDataResult<List<CartItem>> GetCarts(int userId);
        IDataResult<List<Product>> GetCartsDetails(List<CartItemDto> carts);
        IResult RemoveFromCart(CartItemDto carts, int userId);
    }
}
