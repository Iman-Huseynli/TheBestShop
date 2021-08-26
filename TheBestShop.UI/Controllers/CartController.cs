using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheBestShop.Business.Abstract;
using TheBestShop.Core.Extensions;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private ICartItemService _cartItemService;

        public CartController(ICartItemService cartItemService)
        {
            _cartItemService = cartItemService;
        }


        [HttpGet("getcarts")]
        public IActionResult GetCarts()
        {
            int userId = Convert.ToInt32(User.ClaimId());
            var result = _cartItemService.GetCarts(userId);
            return Ok(result);
        }
        
        [HttpPost("getcartsdetails")]
        public IActionResult GetCartsDetails(List<CartItemDto> carts)
        {
            var result = _cartItemService.GetCartsDetails(carts);
            return Ok(result);
        }

        [HttpPost("addtocart")]
        public IActionResult AddToCart(List<CartItemDto> carts)
        {
            int userId = Convert.ToInt32(User.ClaimId());
            var result = _cartItemService.AddToCart(carts, userId);
            return Ok(result);
        }

        [HttpPost("removefromcart")]
        public IActionResult RemoveFromCart(CartItemDto carts)
        {
            int userId = Convert.ToInt32(User.ClaimId());
            var result = _cartItemService.RemoveFromCart(carts, userId);
            return Ok(result);
        }
    }
}
