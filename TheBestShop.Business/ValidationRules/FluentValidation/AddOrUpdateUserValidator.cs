using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.ValidationRules.FluentValidation
{
    public class AddOrUpdateUserValidator : AbstractValidator<AddOrUpdateUserDto>
    {
        public AddOrUpdateUserValidator()
        {
            RuleFor(c => c.FirstName).NotEmpty().MinimumLength(2);
            RuleFor(c => c.LastName).NotEmpty().MinimumLength(2);
            RuleFor(c => c.UserName).NotEmpty().MinimumLength(2);
            RuleFor(c => c.Password).NotEmpty().MinimumLength(5);
            RuleFor(c => c.Email).EmailAddress().NotEmpty();
        }
    }
}
