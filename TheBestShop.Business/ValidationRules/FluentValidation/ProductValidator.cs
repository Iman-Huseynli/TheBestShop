using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Entity.Concrete;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.ValidationRules.FluentValidation
{
    public class ProductValidator : AbstractValidator<AddingProductDto>
    {
        public ProductValidator()
        {
            RuleFor(c => c.Name).NotEmpty().MinimumLength(2);
            RuleFor(c => c.CompanyName).NotEmpty().MinimumLength(2);
            RuleFor(c => c.Description).NotEmpty().MinimumLength(20);
            RuleFor(c => c.Quantity).Must(GreaterThanOrEqual).WithMessage("'Quantity' must be greater than or equal to '0'.");
            RuleFor(c => c.Weight).Must(GreaterThan).WithMessage("'Weight' must be greater than '0'.");
            RuleFor(c => c.Price).Must(GreaterThanOrEqual).WithMessage("'Price' must be greater than or equal to '0'.");
            RuleFor(c => c.CategoryIds).Must(CheckCategoryId).WithMessage("Please select one or more category.");
        }

        private bool CheckCategoryId(List<string> arg)
        {
            if (!string.IsNullOrEmpty(arg[0]))
            {
                return true;
            }
            return false;
        }

        private bool GreaterThanOrEqual(string arg)
        {
            if (!string.IsNullOrEmpty(arg))
            {
                var result = Convert.ToDecimal(arg.Replace('.', ','));
                if (result >= 0)
                {
                    return true;
                }
            }
            return false;
        }

        private bool GreaterThan(string arg)
        {
            if (!string.IsNullOrEmpty(arg))
            {
                var result = Convert.ToDecimal(arg.Replace('.', ','));
                if (result > 0)
                {
                    return true;
                }
            }
            return false;
        }

        private bool StartWithA(string arg)
        {
            return arg.StartsWith("A");
        }
    }
}
