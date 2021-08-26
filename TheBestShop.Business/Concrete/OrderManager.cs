using IyzipayCore;
using IyzipayCore.Model;
using IyzipayCore.Request;
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
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NigroCandle.Core.Utilities.Mail;

namespace TheBestShop.Business.Concrete
{
    public class OrderManager : IOrderService
    {
        private IOrderDal _orderDal;
        private IConfiguration _configuration;
        IMailService _mailService;

        public OrderManager(IOrderDal orderDal, IConfiguration configuration, IMailService mailService)
        {
            _orderDal = orderDal;
            _configuration = configuration;
            _mailService = mailService;
        }


        public IResult AddOrder(OrderDtos orderModel)
        {
            var cart = JsonConvert.DeserializeObject(orderModel.OrderModels[0]);
            orderModel.OrderItems = ((JArray)cart).Select(c => new OrderItemDtos
            {
                Id = (string)c["id"],
                Name = (string)c["name"],
                Price = (decimal)c["price"],
                Quantity = (string)c["quantity"]
            }).ToList();

            var result = PaymentProcess(orderModel);

            if (result.Status == "success")
            {
                var order = CreateOrder(orderModel, result);
                _orderDal.Update(order);
                return new SuccessResult($"{Messages.OrderAdded}");
            }
            return new ErrorResult($"{result.ErrorMessage}");
        }


        private Payment PaymentProcess(OrderDtos orderModel)
        {
            Options options = new Options();
            options.ApiKey = _configuration.GetSection("IyzipaySetting:APIKey").Value;
            options.SecretKey = _configuration.GetSection("IyzipaySetting:APISecret").Value;
            options.BaseUrl = _configuration.GetSection("IyzipaySetting:BaseUrl").Value;

            CreatePaymentRequest request = new CreatePaymentRequest();
            request.Locale = Locale.TR.ToString();
            request.ConversationId = Guid.NewGuid().ToString();
            request.Price = orderModel.TotalPrice;
            request.PaidPrice = orderModel.TotalPrice;
            request.Currency = Currency.USD.ToString();
            request.Installment = 1;
            request.BasketId = orderModel.UserId == null ? Guid.NewGuid().ToString() : orderModel.UserId;
            request.PaymentChannel = PaymentChannel.WEB.ToString();
            request.PaymentGroup = PaymentGroup.PRODUCT.ToString();

            PaymentCard paymentCard = new PaymentCard();
            paymentCard.CardHolderName = "John Doe";
            paymentCard.CardNumber = "4054180000000007";
            paymentCard.ExpireMonth = "12";
            paymentCard.ExpireYear = "2030";
            paymentCard.Cvc = "123";
            paymentCard.RegisterCard = 0;
            request.PaymentCard = paymentCard;

            Buyer buyer = new Buyer();
            buyer.Id = orderModel.UserId != null ? orderModel.UserId : Guid.NewGuid().ToString();
            buyer.Name = orderModel.FirstName;
            buyer.Surname = orderModel.LastName;
            buyer.GsmNumber = orderModel.Phone;
            buyer.Email = "email@email.com";
            buyer.IdentityNumber = "74300864791";
            buyer.LastLoginDate = "2015-10-05 12:43:35";
            buyer.RegistrationDate = "2013-04-21 15:12:09";
            buyer.RegistrationAddress = orderModel.Address;
            buyer.Ip = "85.34.78.112";
            buyer.City = orderModel.City;
            buyer.Country = orderModel.Country;
            buyer.ZipCode = orderModel.Postcode;
            request.Buyer = buyer;

            Address shippingAddress = new Address();
            shippingAddress.ContactName = orderModel.FirstName;
            shippingAddress.City = orderModel.City;
            shippingAddress.Country = orderModel.Country;
            shippingAddress.Description = orderModel.Address;
            shippingAddress.ZipCode = orderModel.Postcode;
            request.ShippingAddress = shippingAddress;

            Address billingAddress = new Address();
            billingAddress.ContactName = orderModel.FirstName;
            billingAddress.City = orderModel.City;
            billingAddress.Country = orderModel.Country;
            billingAddress.Description = orderModel.Address;
            billingAddress.ZipCode = orderModel.Postcode;
            request.BillingAddress = billingAddress;

            List<BasketItem> basketItems = new List<BasketItem>();
            BasketItem basketItem;
            foreach (var item in orderModel.OrderItems)
            {
                basketItem = new BasketItem();
                basketItem.Id = orderModel.UserId != null ? orderModel.UserId : Guid.NewGuid().ToString();
                basketItem.Name = "aaa";
                basketItem.Category1 = "Electronics";
                basketItem.ItemType = BasketItemType.PHYSICAL.ToString();
                basketItem.Price = (item.Price * Convert.ToInt32(item.Quantity)).ToString().Replace(",", ".");
                basketItems.Add(basketItem);
            }
            request.BasketItems = basketItems;

            return Payment.Create(request, options);
        }

        private Order CreateOrder(OrderDtos orderModel, Payment result)
        {
            var order = new Order()
            {
                Address = orderModel.Address,
                City = orderModel.City,
                ConversationId = result.ConversationId,
                Email = orderModel.Email,
                FirstName = orderModel.FirstName,
                LastName = orderModel.LastName,
                OrderDate = DateTime.Now,
                OrderNote = orderModel.OrderNote,
                OrderNumber = result.BasketId,
                PaymentId = result.PaymentId,
                PaymentToken = Guid.NewGuid().ToString(),
                PaymentTypes = Entity.Concrete.EnumPaymentTypes.CreditCart,
                Phone = orderModel.Phone,
                UserId = orderModel.UserId == null ? $"Anonymous-{Guid.NewGuid().ToString()}" : orderModel.UserId
            };

            foreach (var item in orderModel.OrderItems)
            {
                order.OrderItems.Add(new OrderItem
                {
                    ProductId = Convert.ToInt32(item.Id),
                    Price = item.Price,
                    Quantity = Convert.ToInt32(item.Quantity)
                });
            }
            return order;
        }

        public IResult SendOrderWithMail(OrderDtos orderModel)
        {
            var cart = JsonConvert.DeserializeObject(orderModel.OrderModels[0]);
            orderModel.OrderItems = ((JArray)cart).Select(c => new OrderItemDtos
            {
                Id = (string)c["id"],
                Name = (string)c["name"],
                Price = (decimal)c["price"],
                Quantity = (string)c["quantity"]
            }).ToList();

            var emailList = new List<EmailAddress>();
            emailList.Add(new EmailAddress { Address = orderModel.Email, Name = $"{orderModel.FirstName} {orderModel.LastName}"});
            string message = CreateOrderMessage(orderModel);
            _mailService.Send(new EmailMessage
            {
                Content = message,
                Subject = "Order",
                ToAddresses = emailList
            });

            return new SuccessResult($"{Messages.OrderAdded}");
        }

        private string CreateOrderMessage(OrderDtos model)
        {
            string message = $"First name: {model.FirstName} <br/> Last name: {model.LastName} <br/> Email: {model.Email} <br/> Country: {model.Country} <br/> City: {model.City} <br/> Address: {model.Address} <br/> Phone: {model.Phone} <br/> Order note: {model.OrderNote} <br/> <br/> <div div style='border - bottom: 1px solid rgb(133, 133, 133); padding - bottom: 3px; width: 100%; font-weight: bold;'>Orders:</div> <br/>";
            string temp = "";
            model.OrderItems.ForEach(c =>
            {
                temp = $"{temp} Name: {c.Name} <br/>";
                temp = $"{temp} Price: {c.Price} <br/>";
                temp = $"{temp} Quantity: {c.Quantity} <br/>";
                temp = $"{temp} <div style='border - bottom: 1px solid rgb(133, 133, 133); padding - bottom: 3px; width: 100%'></div>  <br/>";
            });
            temp = $"{temp}  <br/> Total price: {model.TotalPrice} <br/>";
            message = $"{message} {temp}";
            return message;
        }
    }
}
