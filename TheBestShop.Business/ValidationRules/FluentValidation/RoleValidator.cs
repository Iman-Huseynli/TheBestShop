using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities.Concrete;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.Business.ValidationRules.FluentValidation
{
    public class RoleValidator : AbstractValidator<RoleForAdminPageDto>
    {
        public RoleValidator()
        {
            RuleFor(c => c.Name).NotEmpty().MinimumLength(3);
        }
    }
}
