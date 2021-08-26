using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.CrossCuttingConcerns.Caching;
using Microsoft.Extensions.DependencyInjection;
using TheBestShop.Core.Utilities.Interceptors;
using TheBestShop.Core.Utilities.IoC;
using Castle.DynamicProxy;

namespace TheBestShop.Core.Aspects.Autofac.Caching
{
    public class CacheRemoveAspect: MethodInterception
    {
        private string _pattern;
        ICacheManager _cacheManager;

        public CacheRemoveAspect(string pattern)
        {
            _pattern = pattern;
            _cacheManager = ServiceTool.ServiceProvider.GetService<ICacheManager>();
        }


        protected override void OnSuccess(IInvocation invocation)
        {
            _cacheManager.RemoveByPattern(_pattern);
        }
    }
}
