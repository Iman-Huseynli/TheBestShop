using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Utilities.Results;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.Abstract
{
    public interface IOrderService
    {
        IResult AddOrder(OrderDtos orderModel);
        IResult SendOrderWithMail(OrderDtos orderModel);
    }
}
