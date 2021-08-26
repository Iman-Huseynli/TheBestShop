using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Utilities.Interceptors;
using TheBestShop.Core.Utilities.IoC;
using Microsoft.Extensions.DependencyInjection;
using Castle.DynamicProxy;
using TheBestShop.Core.Extensions;
using TheBestShop.Business.Constants;

namespace TheBestShop.Business.BusinessAspects.Autofac
{
    public class SecuredOperation: MethodInterception
    {
        private string[] _roles;
        private IHttpContextAccessor _httpContextAccessor;

        public SecuredOperation(string roles)
        {
            _roles = roles.Split(',');
            _httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();
        }


        protected override void OnBefaore(IInvocation invocation)
        {
            var rolesClaims = _httpContextAccessor.HttpContext.User.ClaimRoles();
            foreach (var item in _roles)
            {
                if (rolesClaims.Contains(item))
                {
                    return;
                }
            }
            throw new Exception(Messages.AuthorizationsDenied);
        }
    }
}
