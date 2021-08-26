using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Business.Abstract;
using TheBestShop.Business.Constants;
using TheBestShop.Core.Utilities.Results;
using TheBestShop.DataAccess.Abstract;
using TheBestShop.Entity.Concrete;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.Concrete
{
    public class CartItemManager : ICartItemService
    {
        ICartItemDal _cartItemDal;
        ICartService _cartService;

        public CartItemManager(ICartItemDal cartItemDal, ICartService cartService)
        {
            _cartItemDal = cartItemDal;
            _cartService = cartService;
        }


        public IDataResult<List<CartItem>> AddToCart(List<CartItemDto> carts, int userId)
        {
            var cart = _cartService.FindByUserId(userId);
            if (cart == null) return new ErrorDataResult<List<CartItem>>();
            var cartItems = _cartItemDal.GetAll(c => c.CartId == cart.Data.Id);
            if (cartItems == null)
            {
                foreach (var item in carts)
                {
                    cartItems.Add(new CartItem
                    {
                        CartId = cart.Data.Id,
                        ProductId = item.ProductId,
                        CreateDate = DateTime.Now
                    });
                }
            }
            else
            {
                foreach (var item in carts)
                {
                    int index = cartItems.FindIndex(c => c.ProductId == item.ProductId);
                    if (index == -1)
                    {
                        cartItems.Add(new CartItem
                        {
                            CartId = cart.Data.Id,
                            ProductId = item.ProductId,
                            CreateDate = DateTime.Now
                        });
                    }
                }
            }
            _cartItemDal.AddRange(cartItems);
            return new SuccessDataResult<List<CartItem>>(cartItems);
        }

        public IDataResult<List<CartItem>> GetCarts(int userId)
        {
            var cart = _cartService.FindByUserId(userId);
            var result = _cartItemDal.GetAll(c => c.CartId == cart.Data.Id);
            return new SuccessDataResult<List<CartItem>>(result);
        }

        public IDataResult<List<Product>> GetCartsDetails(List<CartItemDto> carts)
        {
            var result = _cartItemDal.GetCartsDetails(carts);
            return new SuccessDataResult<List<Product>>(result);
        }

        public IResult RemoveFromCart(CartItemDto carts, int userId)
        {
            var cart = _cartService.FindByUserId(userId);
            var cartItem = cart.IsSuccess ? _cartItemDal.Get(c => c.ProductId == carts.ProductId && cart.Data.Id == c.CartId) : null;
            _cartItemDal.Delete(cartItem);
            return new SuccessResult($"Cart {Messages.Deleted}");
        }
    }
}
