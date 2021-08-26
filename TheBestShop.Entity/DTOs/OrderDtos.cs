using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities;
using TheBestShop.Entity.Concrete;

namespace TheBestShop.Entity.DTOs
{
    public class OrderDtos: IDto
    {
        public string OrderNumber { get; set; }
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Town { get; set; }
        public string Address { get; set; }
        public string Postcode { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public EnumPaymentTypes PaymentTypes { get; set; }
        public string CartName { get; set; }
        public string CartNumber { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }
        public string Cvv { get; set; }
        public string OrderNote { get; set; }
        public string TotalPrice { get; set; }
        public List<string> OrderModels { get; set; }
        public List<OrderItemDtos> OrderItems { get; set; }
    }
    public enum EnumPaymentTypes
    {
        CreditCart = 0,
        Eft = 1
    }
}

