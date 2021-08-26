using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.ValidationRules.FluentValidation
{
    public class CategoryValidator: AbstractValidator<AddingCategoryDto>
    {
        public CategoryValidator()
        {
            RuleFor(c => c.Name).NotEmpty().MinimumLength(2);
        }
    }
}
