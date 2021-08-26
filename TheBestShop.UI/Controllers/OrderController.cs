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
    public class OrderController : ControllerBase
    {
        private IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }


        [HttpPost("addorder")]
        public IActionResult Post([FromForm] OrderDtos orderModel)
        {
            string userId = User.ClaimId();
            orderModel.UserId = userId != "0" ? userId : null;
            var result = _orderService.SendOrderWithMail(orderModel);
            return Ok(result);
        }
    }
}
